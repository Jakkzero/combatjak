<script lang="ts">
    import type { CombatantEntry } from "../util";
    import { getJobColour } from "../util";
    export let data: CombatantEntry;

</script>

<main>
    <div class="combatant-container" style="background: {getJobColour(data.job, data.damageportion)}">
        <b>
        <div class="combatant-job-portion">
            <span id="combatant-job">{data.job}</span>
            <span>{data.damageportion}</span>
        </div>
        </b>

        <div class="combatant-main-text">
            <span id="combatant-name">{data.name}</span>
            <span>{`${data.formatdps} DPS`}</span>
        </div>

        <div class="combatant-rate-stats">
            <!-- <span>{`Crit: ${data.critrate}`}</span>
            <span>{`DH: ${data.dhrate}`}</span>
            <span>{`!!!: ${data.critdhrate}`}</span> -->

            <span id="combatant-stat-unit">
                <span>Crit </span>
                <span>{data.critrate}</span>
            </span>

            <span id="combatant-stat-unit">
                <span>DH </span>
                <span>{data.dhrate}</span>
            </span>

            <span id="combatant-stat-unit">
                <span>!!!</span>
                <span>{data.critdhrate}</span>
            </span>
        </div>
    </div>
</main>

<style>
    .combatant-container {
        border: 2px solid black;
        font-size: 12px;
        color: #101010;
        display: flex;
        padding: 5px;
        align-items: center;
    }
    .combatant-job-portion {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 3px;
        width: 40px;
        padding-right: 8px;
        line-height: 0px;
    }
    #combatant-job {
        font-size: 16px;
        padding-bottom: 14px;
    }
    .combatant-main-text {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        padding: 3px;
        align-items: flex-start;
        justify-content: flex-start;
        line-height: 0px;
    }
    #combatant-name {
        padding-bottom: 12px;
    }
    .combatant-rate-stats {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        line-height: 10px;
        margin-left: auto;
        font-size: 12px;
        padding: 5px;
        padding-block: 0px;
    }
    #combatant-stat-unit {
        display: flex;
        flex-direction: column;
        padding-left: 4px;
    }
</style>
