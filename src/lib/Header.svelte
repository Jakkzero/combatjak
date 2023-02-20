<script lang="ts">
    export let timer: string = "00:00";
    export let target: string = "";
    export let location: string = "";
    export let isActive: boolean = false;

    const getColour = (i) => {
        console.log(`Called getColour with ${i}`)
        return i ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 100, 100, 0.8)"
    }
    
</script>

<main>
    <div class="overlay-header">
        <div class="encounter-timer" style="color: {getColour(isActive)}" >
            {timer}
        </div>

        <div class="encounter-text">
            <span>
                {target}
            </span>
            <span id="location">
                {location}
            </span>
        </div>
    </div>
</main>

<style>
    .overlay-header{
        min-width: 100vw;
        background-color: rgba(52, 52, 52, 0.8);
        text-align: left;
        display: flex;
        padding-block: 3px;
    }
    .encounter-timer {
        min-width: 58px;
        display: flex;
        align-items: center;
        font-size: x-large;
        padding-inline: 10px;
    }
    .encounter-text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 14px;
        line-height: 0px;
    }
    #location {
        padding-top: 16px;
        color: rgba(255, 255, 255, 0.4);
    }
</style>