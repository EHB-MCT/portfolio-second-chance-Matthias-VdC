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
    isReset: false,
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
            round: 1,
            enemyFrequency: 5,
            roundPlaying: false,
            isReset: true,
        }))
        console.log(get().round);
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
            isReset: false,
        }))
        let enemyCount = Math.floor((get().round + get().round / get().enemyFrequency) + 5);
        // for (let i = 0; i < enemyCount; i++) {
        for (let i = 0; i < 2; i++) {
            get().spawnEnemy(get().round, Math.floor(get().round * 1.2), i + 1, enemyCount, Math.floor(get().round * 1.4 + 10));
        }
    },
    endRound: async () => {
        set((prev) => ({
            roundPlaying: false,
            round: prev.round + 1,
            money: prev.round * 5 <= 150 ? prev.money + prev.round * 5 : prev.money + 150,
            // increase money earned per round, limit to 150
        }))
    },
    setEnemiesPos: async (pos, x, y, z) => {
        set((prev) => {
            if (typeof prev.enemiesPos[pos] === 'undefined') { // if position does not exist add new position
                return ({
                    enemiesPos: [
                        ...prev.enemiesPos,
                        {
                            pos: pos,
                            x: x,
                            y: y,
                            z: z,
                        }
                    ]
                });
            } else { // If position already has data, update existing data
                let newPos = prev.enemiesPos.map(u => u.pos !== pos ? u : { pos: pos, x: x, y: y, z: z });
                return ({
                    enemiesPos: newPos,
                });
            }
        })
    },
    getEnemiesPos: async () => {
        return get().enemiesPos;
    },
    dealTurretDamage: async (damage, target) => {
        set((prev) => {
            let enemy = prev.enemies[target];
            enemy.health = enemy.health - damage;
            if (enemy.health > 0) {
                let newEnemy = prev.enemies.map(u => u.order !== target ? u : enemy);
                return ({
                    enemies: newEnemy,
                });
            } else {
                return ({
                    enemies: prev.enemies.splice(target, 1),
                })
            }
        })
        if (get().enemies[target].health <= 0) {
            get().deleteEnemy(target + 1);
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
            round: 1,
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
