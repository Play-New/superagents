/**
 * Version checker - checks for updates in the background
 *
 * Fetches latest version from GitHub and notifies user if update available.
 * Caches check results to avoid spamming (checks once per day).
 */
/**
 * Check for updates (non-blocking)
 * Returns update info if available, null otherwise
 */
export declare function checkForUpdates(): Promise<{
    current: string;
    latest: string;
} | null>;
/**
 * Display update notification
 */
export declare function displayUpdateNotification(update: {
    current: string;
    latest: string;
}): void;
/**
 * Get current version
 */
export declare function getCurrentVersion(): string;
//# sourceMappingURL=version-check.d.ts.map