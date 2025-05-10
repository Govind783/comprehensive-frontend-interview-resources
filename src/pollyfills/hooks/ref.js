const hooks = [];
let idx = 0;

export function useRef2(initial) {
  if (!hooks[idx]) {
    hooks[idx] = { current: initial };
  }

  return hooks[idx++];
}