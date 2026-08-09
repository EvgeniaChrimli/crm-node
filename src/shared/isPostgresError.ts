export function isPostrgesErr(err: unknown): err is { code: string } {
  return typeof err === "object" && err !== null && "code" in err;
}
