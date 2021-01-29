const settings = {
    open: false
}

function toggleSettings() {
    if  (settings.open == false) {
        settings.open = true
        const container = document.getElementById("settingsContainer")

        updateOptions()

        container.id = "settingsContainerOpen"
    }
    else {
        settings.open = false
        const container = document.getElementById("settingsContainerOpen")

        container.id = "settingsContainer"
    }
}

async function updateOptions() {
    const response = await axios.get("/config")
    const config = response.data

    const container = vie.get("#inputs")
    container.innerHTML = ""

    const keys = Object.keys(config)

    keys.forEach(key => {
        const name = vie.new("p", ".inputLabel", key)
        const input = vie.new("input", "#input_" + key)
        input.value = config[key]

        vie.insert(container, [name, input])
    })
}

async function dispatchSettings() {
    const newConfig = {}

    const response = await axios.get("/config")
    const config = response.data

    const keys = Object.keys(config)

    keys.forEach(key => {
        const value = vie.get("#input_" + key).value

        newConfig[key] = value
    })

    console.log(newConfig);
    await axios.post("/config", newConfig)
    toggleSettings()
}