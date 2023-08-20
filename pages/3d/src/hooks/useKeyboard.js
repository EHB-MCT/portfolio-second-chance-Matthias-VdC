import { useCallback, useEffect, useState } from "react"
import { useStore } from "./useStore.js";

function actionByKey(key) {
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'crossbow',
        Digit2: 'ballista',
        Digit3: '',
    };
    return keyActionMap[key];
}

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        crossbow: false,
        texture2: false,
        texture3: false,
    });
    const setPrice = useStore((state) => state.setPrice)

    const price = {
        crossbow: 75,
        ballista: 150,
    };

    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code);
        if (action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: true
                });
            });
            // verify if a price for the item exists
            if (Object.values(price).indexOf(action) > -1) {
                useStore.setState({ selectedPrice: price[action] })
            }
        }
    }, []);

    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code)
        if (action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: false
                });
            });
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp]);
    return actions;
}