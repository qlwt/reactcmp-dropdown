export type FnORef<T> = () => T
export type FnORefHTML<T extends HTMLElement | null = HTMLElement | null> = FnORef<T>

export type FnIRef<T> = (element: T) => void
export type FnIRefHTML<T extends HTMLElement | null = HTMLElement | null> = FnIRef<T>
