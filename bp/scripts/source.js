import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { collectPluginStats } from "@minecraft/debug-utilities";

const structureInfo = {
  "tree_0": {
    width: 5,
    length: 5,
    height: 10
  },
  "tree_1": {
    width: 5,
    length: 5,
    height: 10
  },
  "tree_2": {
    width: 5,
    length: 5,
    height: 10
  },
  "tree_3": {
    width: 5,
    length: 5,
    height: 10
  },
  "tree_4": {
    width: 5,
    length: 5,
    height: 10
  },
  "tree_5": {
    width: 5,
    length: 5,
    height: 10
  },
  'tree_6': {
    width: 5,
    length: 5,
    height: 10
  },
  'tree_7': {
    width: 5,
    length: 5,
    height: 10
  },
  'tree_8': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_0': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_1': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_2': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_3': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_4': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_5': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_6': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_7': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_8': {
    width: 5,
    length: 5,
    height: 10
  },
  'ore_tree_9': {
    width: 5,
    length: 5,
    height: 10
  }
};

const treeNames = [
  '%sf.name.tree_0',
  '%sf.name.tree_1',
  '%sf.name.tree_2',
  '%sf.name.tree_3',
  '%sf.name.tree_4',
  '%sf.name.tree_5',
  '%sf.name.tree_6',
  '%sf.name.tree_7',
  '%sf.name.tree_8'
];
const oreTreeNames = [
  '%sf.name.ore_tree_0',
  '%sf.name.ore_tree_1',
  '%sf.name.ore_tree_2',
  '%sf.name.ore_tree_3',
  '%sf.name.ore_tree_4',
  '%sf.name.ore_tree_5',
  '%sf.name.ore_tree_6',
  '%sf.name.ore_tree_7',
  '%sf.name.ore_tree_8',
  '%sf.name.ore_tree_9'
];

const treeStructures = [
  'tree_0',
  'tree_1',
  'tree_2',
  'tree_3',
  'tree_4',
  'tree_5',
  'tree_6',
  'tree_7',
  'tree_8'
];
const oreTreeStructures = [
  'ore_tree_0',
  'ore_tree_1',
  'ore_tree_2',
  'ore_tree_3',
  'ore_tree_4',
  'ore_tree_5',
  'ore_tree_6',
  'ore_tree_7',
  'ore_tree_8',
  'ore_tree_9'
];

let overworld

function mainMenu(player) {
  const plugin = collectPluginStats().plugins.find(p => p.scriptModuleUUID === '6ea05c8b-2227-4b6f-aa91-af7f92ebc91c');
  const form = new ActionFormData()
  .title('%sf.gui.title')
  .button('%sf.gui.button1', 'textures/blocks/sapling_oak');
  if (plugin) {
    form.button('%sf.gui.button2', 'textures/ore_trees/diamond_sapling');
  }
  form.show(player).then(res => {
    player.runCommand(`setblock 0 -1 0 barrier`);
    if (res.canceled) {
      system.runTimeout(() => mainMenu(player), 40);
      return;
    }
    if (res.selection === 0) {
      vanillaTrees(player);
    }
    if (res.selection === 1) {
      if (plugin) {
        oreTrees(player);
      } else {
        errorMenu(player);
      }
    }
  });
}

function vanillaTrees(player) {
  const form = new ModalFormData()
  .title('%sf.gui.title.vt')
  .dropdown('%sf.gui.dropdown.vt', treeNames);
  form.show(player).then(res => {
    if (res.canceled) {
      system.runTimeout(() => mainMenu(player), 20);
      return;
    }
    const selectedIndex = Number(res.formValues?.[0]);
    const selectedStructure = treeStructures[selectedIndex];
    const info = structureInfo[selectedStructure];
    const { x, y, z } = player.location;
    const baseX = Math.floor(x);
    const baseY = Math.floor(y) - 1;
    const baseZ = Math.floor(z);
    player.runCommand(`setblock ${baseX} ${baseY} ${baseZ} air`);
    player.runCommand(`structure load ${selectedStructure} ${baseX} ${baseY} ${baseZ}`);
    const centerX = baseX + Math.floor(info.width / 2);
    const centerY = baseY + info.height;
    const centerZ = baseZ + Math.floor(info.length / 2);
    player.teleport({
      x: centerX,
      y: centerY,
      z: centerZ
    },
    {
      dimension: overworld
    });
    player.runCommand(`setworldspawn ${centerX} ${centerY} ${centerZ}`);
  });
}

function oreTrees(player) {
  const form = new ModalFormData()
  .title('%sf.gui.title.ot')
  .dropdown('%sf.gui.dropdown.ot', oreTreeNames);
  form.show(player).then(res => {
    if (res.canceled) {
      system.runTimeout(() => mainMenu(player), 20);
      return;
    }
    const selectedIndex = Number(res.formValues?.[0]);
    const selectedStructure = oreTreeStructures[selectedIndex];
    const info = structureInfo[selectedStructure];
    const {
      x,
      y,
      z
    } = player.location;
    const baseX = Math.floor(x);
    const baseY = Math.floor(y) - 1;
    const baseZ = Math.floor(z);
    player.runCommand(`setblock ${baseX} ${baseY} ${baseZ} air`);
    player.runCommand(`structure load ${selectedStructure} ${baseX} ${baseY} ${baseZ}`);
    const centerX = baseX + Math.floor(info.width / 2);
    const centerY = baseY + info.height;
    const centerZ = baseZ + Math.floor(info.length / 2);
    player.teleport({
      x: centerX,
      y: centerY,
      z: centerZ
    }, 
    {
      dimension: overworld
    });
    player.runCommand(`setworldspawn ${centerX} ${centerY} ${centerZ}`);
  });
}

function errorMenu(player) {
  const form = new ActionFormData()
  .title('%sf.gui.title.error')
  .body('%sf.gui.body.error');
  form.show(player).then(res => {
    if (res.canceled) {
      system.runTimeout(() => mainMenu(player), 20);
      return;
    }
  });
}

world.afterEvents.worldLoad.subscribe((event) => {
  const overworld = world.getDimension('overworld');
  system.run(() => {
    if (world.getDynamicProperty('one') === undefined) {
      world.setDynamicProperty('one', false);
    }
  });
});

world.afterEvents.playerSpawn.subscribe((event) => {
  const player = event.player;
  if (!world.getDynamicProperty('one')) {
    mainMenu(player);
    world.setDynamicProperty('one', true);
  }
});