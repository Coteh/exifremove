export interface RemoveOptions {
    verbose?: boolean;
    keepMarker?: boolean;
}

export function remove(
    imageBuffer: Uint8Array | Buffer,
    options?: RemoveOptions,
): Buffer | undefined;

export function removeMultiple(
    imageBuffers: Array<Uint8Array | Buffer>,
    options?: RemoveOptions,
): Array<Buffer | undefined>;
