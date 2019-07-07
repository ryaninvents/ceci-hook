function shallowEquals(a, b) {
  if (a.length !== b.length) return false;
  return a.every((el, i) => el === b[i]);
}

const noop = () => {};

/**
 * 
 * @param {Function} mount Utility function to run when inputs change.
 *   All arguments passed to `runEffect` are considered to be dependencies;
 *   everything else must be passed via closure.
 */
export default function createEffect(mount) {
  let lastDeps = null;
  let unmount = noop;
  return function runEffect(...deps) {
    if (lastDeps && shallowEquals(deps, lastDeps)) return;

    // Something changed
    unmount();
    const mountResult = mount(...deps);
    unmount = typeof mountResult === 'function' ? mountResult : noop;
    lastDeps = deps;
  };
}