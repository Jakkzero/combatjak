<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Combatant from "./lib/Combatant.svelte";
  import { parseJSONtoCombatantEntryArray, type CombatantEntry } from "./util";
  // TEST DATA 
  // import { combatantSort } from "./util";

  // const test_entry: CombatantEntry = {
  //   name: "Arka Saviour",
  //   realdps: 55889,
  //   formatdps: "55.89K",
  //   damageportion: "79%",
  //   job: "MCH",
  //   critrate: "12%",
  //   dhrate: "30%",
  //   critdhrate: "2%"
  // }
  // const test_entry_2: CombatantEntry = {
  //   name: "Summoner Guy",
  //   realdps: 55889,
  //   formatdps: "55.89K",
  //   damageportion: "12%",
  //   job: "SMN",
  //   critrate: "12%",
  //   dhrate: "30%",
  //   critdhrate: "2%"
  // }

  // let currentCombatData: CombatantEntry[] = [test_entry, test_entry_2].sort(combatantSort);

  let currentCombatData: CombatantEntry[] = [];

  
  let isFighting: boolean = false;
  let encountertimer, encountertarget, encounterlocation;

  addOverlayListener("CombatData", (e) => {
    console.log(e)
    encountertimer = e.Encounter.duration;
    encountertarget = e.Encounter.title;
    encounterlocation = e.Encounter.CurrentZoneName;

    // TODO: Use this value to detect when a new encounter starts.
    isFighting = e.isActive;
    console.log(isFighting)
  
    // Turn our nasty JSON values into clean TypeScript values
    currentCombatData = parseJSONtoCombatantEntryArray(e.Combatant);
  })

  // Get the detection started!
  startOverlayEvents();
</script>

<main>
  <div class="page-wrapper">

    <nav>
      <Header 
        bind:timer={encountertimer}
        bind:target={encountertarget}
        bind:location={encounterlocation}
        bind:isActive={isFighting}
      />
    </nav>

    <div class="content-wrapper">

      <div class="combatant-list">
        {#each currentCombatData as combatant}
          <Combatant bind:data={combatant} />
        {/each}
      </div>

    </div>


  </div>
</main>

<style>
  .content-wrapper {
    display: flex;
  }
  .combatant-list {
    width: 60vw;
  }
</style>