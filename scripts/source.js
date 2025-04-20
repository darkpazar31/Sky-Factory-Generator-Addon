import { world } from "@minecraft/server";

world.afterEvents.playerSpawn.subscribe(event => {
  const dim = world.getDimension("overworld");
  if (world.getDynamicProperty("hasSpawnedTree")) return;
  const player = event.player;
  const { x, y, z } = player.location;
  dim.runCommandAsync(`setblock ${x} ${y - 1} ${z} dirt`);
  dim.runCommandAsync(`setblock ${x} ${y} ${z} dirt`);
  for (let i = 0; i < 4; i++) {
    dim.runCommandAsync(`setblock ${x} ${y + 1 + i} ${z} oak_log`);
  }
  for (let dy = 4; dy <= 5; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 3)
          dim.runCommandAsync(`setblock ${x + dx} ${y + dy} ${z + dz} oak_leaves`);
      }
    }
  }
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      dim.runCommandAsync(`setblock ${x + dx} ${y + 6} ${z + dz} oak_leaves`);
    }
  }
  dim.runCommandAsync(`setblock ${x} ${y + 7} ${z} oak_leaves`);
  world.setDynamicProperty("hasSpawnedTree", true);
  player.teleport({ x, y: y + 8, z }, { dimension: dim });
});