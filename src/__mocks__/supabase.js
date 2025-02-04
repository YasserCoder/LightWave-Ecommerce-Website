import { vi } from "vitest";

export default {
    auth: {
        signUp: vi.fn(),
        signInWithPassword: vi.fn(),
        getSession: vi.fn(),
        getUser: vi.fn(),
        signOut: vi.fn(),
        updateUser: vi.fn(),
    },
    from: vi.fn(() => ({
        insert: vi.fn(),
        update: vi.fn(() => ({
            eq: vi.fn(),
        })),
        eq: vi.fn(),
        neq: vi.fn(),
        delete: vi.fn(),
        select: vi.fn(() => ({
            order: vi.fn(),
            single: vi.fn(),
            in: vi.fn(),
            gt: vi.fn(),
            or: vi.fn(),
            range: vi.fn(),
        })),
    })),
};
