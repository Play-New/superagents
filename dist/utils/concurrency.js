/**
 * Concurrency utilities for parallel API calls
 */
import pLimit from 'p-limit';
import { log } from './logger.js';
// Limit concurrent API calls to avoid rate limiting
// Configurable via environment variable for different environments
const DEFAULT_CONCURRENCY = 3;
const API_CONCURRENCY = parseInt(process.env.SUPERAGENTS_CONCURRENCY || String(DEFAULT_CONCURRENCY), 10) || DEFAULT_CONCURRENCY;
/**
 * Create a new rate limiter (internal helper)
 */
const createLimiter = () => pLimit(API_CONCURRENCY);
/**
 * Execute tasks in parallel with concurrency limit and progress tracking
 */
export async function parallelGenerate(items, generator, onProgress) {
    if (items.length === 0)
        return [];
    const limit = createLimiter();
    let completed = 0;
    const promises = items.map(item => limit(async () => {
        const result = await generator(item);
        completed++;
        onProgress?.(completed, items.length, item);
        return result;
    }));
    return Promise.all(promises);
}
/**
 * Execute tasks in parallel, collecting results and errors separately
 */
export async function parallelGenerateWithErrors(items, generator, onSuccess, onError) {
    if (items.length === 0)
        return { results: [], errors: [] };
    const limit = createLimiter();
    const results = [];
    const errors = [];
    const promises = items.map(item => limit(async () => {
        try {
            const result = await generator(item);
            results.push(result);
            onSuccess?.(item, result);
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            errors.push({ item, error: err });
            onError?.(item, err);
        }
    }));
    await Promise.all(promises);
    return { results, errors };
}
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503]);
/**
 * Check whether an error is transient and worth retrying.
 * Retries on: 429 (rate limit), 500/502/503 (server errors), network errors.
 * Does NOT retry on: 400, 401, 403, or other client errors.
 */
function isRetryableError(error) {
    if (error instanceof Error) {
        // Anthropic SDK errors expose a `status` property
        const status = error.status;
        if (typeof status === 'number') {
            return RETRYABLE_STATUS_CODES.has(status);
        }
        // Network / connection errors (no status code)
        const name = error.name ?? '';
        if (name === 'APIConnectionError' || name === 'APIConnectionTimeoutError') {
            return true;
        }
        // Generic network errors (e.g. fetch failures)
        if (error.message.includes('ECONNRESET') ||
            error.message.includes('ETIMEDOUT') ||
            error.message.includes('fetch failed')) {
            return true;
        }
    }
    return false;
}
/**
 * Execute an async function with exponential backoff retry.
 * Only retries on transient errors (429, 5xx, network).
 */
export async function withRetry(fn, opts) {
    const maxRetries = opts?.maxRetries ?? 3;
    const baseDelayMs = opts?.baseDelayMs ?? 1000;
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxRetries || !isRetryableError(error)) {
                throw error;
            }
            const delayMs = baseDelayMs * Math.pow(2, attempt);
            const message = error instanceof Error ? error.message : String(error);
            log.debug(`Retry ${attempt + 1}/${maxRetries} after ${delayMs}ms - ${message}`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    // Unreachable, but satisfies TypeScript
    throw lastError;
}
//# sourceMappingURL=concurrency.js.map