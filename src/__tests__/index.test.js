import createEffect from '..';

describe('ceci-hook', () => {
  it('should run on mount', () => {
    let state = false;
    const runEffect = createEffect(() => {
      state = true;
    });
    runEffect();
    expect(state).toBe(true);
  });
  it('should run dismount function if provided', () => {
    let exitState = null;
    const runEffect = createEffect((arg) => {
      return () => {
        if (!arg) return;
        exitState = arg;
      };
    });
    
    // Run twice to simulate mounting and dismounting a component
    runEffect('first');
    runEffect(null);
    expect(exitState).toBe('first');
  });
});