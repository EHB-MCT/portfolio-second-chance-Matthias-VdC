import create from "zustand";
import { nanoid } from "nanoid";
import { Vector3 } from "three";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set, get) => ({
    texture: 'crossbow',
    selectedPrice: 75,
    path: [[-0.5, 0.5, -13.5], [-0.5, 0.5, -12.5], [-0.5, 0.5, -11.5], [-0.5, 0.5, -10.5], [-0.5, 0.5, -9.5], [-0.5, 0.5, -8.5], [-0.5, 0.5, -7.5], [0.5, 0.5, -7.5], [1.5, 0.5, -7.5], [2.5, 0.5, -7.5], [3.5, 0.5, -7.5], [4.5, 0.5, -7.5], [4.5, 0.5, -8.5], [4.5, 0.5, -9.5], [4.5, 0.5, -10.5], [3.5, 0.5, -10.5], [2.5, 0.5, -10.5], [1.5, 0.5, -10.5], [1.5, 0.5, -9.5], [1.5, 0.5, -8.5], [1.5, 0.5, -6.5], [1.5, 0.5, -5.5], [1.5, 0.5, -4.5], [1.5, 0.5, -3.5], [1.5, 0.5, -2.5], [1.5, 0.5, -1.5], [1.5, 0.5, -0.5], [1.5, 0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, -1.5], [-0.5, 0.5, -2.5], [-0.5, 0.5, -3.5], [-0.5, 0.5, -4.5], [-1.5, 0.5, -4.5], [-2.5, 0.5, -4.5], [-2.5, 0.5, -3.5], [-2.5, 0.5, -2.5], [-3.5, 0.5, -2.5], [-4.5, 0.5, -2.5], [-4.5, 0.5, -3.5], [-4.5, 0.5, -4.5], [-4.5, 0.5, -5.5], [-4.5, 0.5, -6.5], [-4.5, 0.5, -7.5], [-4.5, 0.5, -8.5], [-5.5, 0.5, -8.5], [-6.5, 0.5, -8.5], [-6.5, 0.5, -7.5], [-6.5, 0.5, -6.5], [-6.5, 0.5, -5.5], [-6.5, 0.5, -4.5], [-6.5, 0.5, -3.5], [-6.5, 0.5, -2.5], [-6.5, 0.5, -1.5], [-6.5, 0.5, -0.5]],
    cubes: getLocalStorage('cubes') || [],
    enemies: [],
    enemiesPos: [],
    health: 20,
    money: 100,
    round: 0,
    enemyFrequency: 5,
    roundPlaying: false,
    isGameOver: false,
    addCube: async (x, y, z, price) => {
        if (get().money >= get().selectedPrice) {
            set((prev) => ({
                cubes: [
                    ...prev.cubes,
                    {
                        key: nanoid(),
                        pos: [x, y, z],
                        texture: prev.texture,
                    }
                ],
                money: prev.money - prev.selectedPrice,
            }));
        }
    },
    removeCube: async (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos;
                return X !== x || Z !== z;
            }),
            money: prev.money + 60,
        }));
    },
    setTexture: async (texture) => {
        set(() => ({ texture }))
    },
    saveWorld: async () => {
        set((prev) => {
            setLocalStorage('cubes', prev.cubes)
        })
    },
    resetWorld: async () => {
        setLocalStorage('cubes', null);
        set(() => ({
            cubes: [],
            enemies: [],
            enemiesPos: [],
            health: 20,
            money: 100,
            round: 0,
            enemyFrequency: 5,
            roundPlaying: false,
        }))
    },
    spawnEnemy: async (level, speed, count, max, health) => {
        set((prev) => ({
            enemies: [
                ...prev.enemies,
                {
                    key: nanoid(),
                    type: 'cube',
                    level: level,
                    speed: speed,
                    order: count,
                    max: max,
                    health: health,
                    maxHealth: health,
                }
            ]
        }))
    },
    startRound: async () => {
        set((prev) => ({
            roundPlaying: true,
            enemyFrequency: get().enemyFrequency - get().round / 10,
        }))
        let enemyCount = Math.floor((get().round + get().round / get().enemyFrequency) + 5);
        for (let i = 0; i < enemyCount; i++) {
            get().spawnEnemy(get().round, Math.floor(get().round * 1.2), i + 1, enemyCount, Math.floor(get().round * 1.4 + 10));
        }
        // Not working because state change resets animation (so delay makes it weird)
        // let interval = setInterval(() => get().spawnEnemy(get().round, get().round * 1.2), get().enemyFrequency * 1000);
        // setTimeout(() => clearInterval(interval), get().enemyFrequency * 1000 * enemyCount);
    },
    endRound: async () => {
        set((prev) => ({
            round: prev.round + 1,
            roundPlaying: false,
            money: prev.round * 5 <= 150 ? prev.money + prev.round * 5 : prev.money + 150,
            // increase money earned per round, limit to 150
        }))
    },
    setEnemiesPos: async (pos, x, y, z) => {
        set((prev) => ({
            enemiesPos: [
                ...prev.enemiesPos.slice(0, pos - 1),
                {
                    x: x,
                    y: y,
                    z: z,
                },
                ...prev.enemiesPos.slice(pos),
            ]
        }))
    },
    getEnemiesPos: async () => {
        return get().enemiesPos;
    },
    dealTurretDamage: async (damage, target) => {
        if (get().enemies[target - 1]) {
            set((prev) => ({
                enemies: [
                    ...prev.enemies.slice(0, target - 1),
                    {
                        ...prev.enemies[target - 1],
                        health: prev.enemies[target - 1].health - damage,
                    },
                    ...prev.enemies.slice(target),
                ]
            }))
        }
        if (get().enemies.length > 0) {
            const deleteIndex = get().enemies.filter((el) => {
                // console.log(el);
                if (el) {
                    if (el.health) {
                        if (el.health <= 0) {
                            return el.order;
                        }
                    }
                }
                return undefined;
            });
            if (deleteIndex.length > 0) {
                console.log(deleteIndex[0].order);
                get().deleteEnemy(deleteIndex[0].order);
            }
        }
    },
    deleteEnemy: async (target) => {
        set((prev) => ({
            money: prev.money + 5,
            enemies: [
                ...prev.enemies,
            ].filter((el) => el.order !== target)
        }))
    },
    takeDamage: async (damage) => {
        set((prev) => ({
            health: prev.health - damage,
        }))
        if (get().health <= 0) {
            get().gameOver()
        }
    },

    gameOver: async () => {
        setLocalStorage('cubes', null);
        set(() => ({
            cubes: [],
            enemies: [],
            enemiesPos: [],
            health: 20,
            money: 100,
            round: 0,
            enemyFrequency: 5,
            roundPlaying: false,
            isGameOver: true,
        }))
    },
    setRestartGame: async () => {
        set(() => ({
            isGameOver: false,
        }))
    }
}));
