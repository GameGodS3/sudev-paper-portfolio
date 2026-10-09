/**
 * The only rotations used on the site. Assigned by index so the layout is deterministic
 * (no random angles that change between renders or screenshots).
 */
const TILTS = [-1.5, 0, 1.5] as const;

export type Tilt = (typeof TILTS)[number];

export function tiltFor(index: number): Tilt {
    return TILTS[((index % TILTS.length) + TILTS.length) % TILTS.length];
}
