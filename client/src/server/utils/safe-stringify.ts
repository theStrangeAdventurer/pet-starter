export function safeStringify(value: object) {
  return JSON.stringify(value).replace(/[<]/g, '%lt').replace(/[>]/g, '%gt');
}
