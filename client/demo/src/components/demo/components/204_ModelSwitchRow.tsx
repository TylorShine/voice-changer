import React, { useMemo } from "react"
import { useAppState } from "../../../001_provider/001_AppStateProvider"


export type ModelSwitchRowProps = {
}

export const ModelSwitchRow = (_props: ModelSwitchRowProps) => {
    const appState = useAppState()

    const modelSwitchRow = useMemo(() => {
        const slot = appState.serverSetting.serverSetting.modelSlotIndex

        const onSwitchModelClicked = async (slot: number) => {
            // Quick hack for same slot is selected. 下３桁が実際のSlotID
            const dummyModelSlotIndex = (Math.floor(Date.now() / 1000)) * 1000 + slot
            await appState.serverSetting.updateServerSettings({ ...appState.serverSetting.serverSetting, modelSlotIndex: dummyModelSlotIndex })
            setTimeout(() => { // quick hack
                appState.getInfo()
            }, 1000 * 2)
        }


        const options = appState.serverSetting.serverSetting.modelSlots.map((x, index) => {
            let filename = ""
            if (x.modelFile && x.modelFile.length > 0) {
                filename = x.modelFile.replace(/^.*[\\\/]/, '')
            } else {
                return null
            }
            const f0str = x.f0 == true ? "f0" : "nof0"
            const srstr = Math.floor(x.samplingRate / 1000) + "K"
            const embedstr = x.embChannels
            const typestr = x.modelType == 0 ? "org" : "webui"
            const metadata = x.deprecated ? "[deprecated version]" : `[${f0str},${srstr},${embedstr},${typestr}]`
            const displayName = `${metadata} ${filename}`


            return (
                <option key={index} value={index}>{displayName}</option>
            )
        }).filter(x => { return x != null })

        return (
            <>
                <div className="body-row split-3-7 left-padding-1 guided">
                    <div className="body-item-title left-padding-1">Swicth Model</div>
                    <div className="body-input-container">
                        <select className="body-select" value={slot} onChange={(e) => {
                            onSwitchModelClicked(Number(e.target.value))
                        }}>
                            {options}
                        </select>
                    </div>
                </div>
            </>
        )
    }, [appState.getInfo, appState.serverSetting.serverSetting])

    return modelSwitchRow
}

