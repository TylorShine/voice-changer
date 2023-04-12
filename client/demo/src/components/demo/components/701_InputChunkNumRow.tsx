import React, { useMemo } from "react"
import { useAppState } from "../../../001_provider/001_AppStateProvider"

export type InputChunkNumRowProps = {
}
export const InputChunkNumRow = (_props: InputChunkNumRowProps) => {
    const appState = useAppState()
    const inputChunkNumRow = useMemo(() => {
        return (
            <div className="body-row split-3-2-1-4 left-padding-1 guided">
                <div className="body-item-title left-padding-1">Input Chunk Num(128sample/chunk)</div>
                <div className="body-input-container">
                    <select className="body-select" value={appState.workletNodeSetting.workletNodeSetting.inputChunkNum} onChange={(e) => {
                        appState.workletNodeSetting.updateWorkletNodeSetting({ ...appState.workletNodeSetting.workletNodeSetting, inputChunkNum: Number(e.target.value) })
                        appState.workletNodeSetting.trancateBuffer()
                    }}>
                        {
                            [16, 32, 64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024, 2048].map(x => {
                                return <option key={x} value={x}>{x}</option>
                            })
                        }
                    </select>
                </div>
                <div className="body-item-text">
                    <div>buff: {(appState.workletNodeSetting.workletNodeSetting.inputChunkNum * 128 * 1000 / 48000).toFixed(1)}ms</div>
                </div>
                <div className="body-item-text"></div>

            </div>
        )
    }, [appState.workletNodeSetting.workletNodeSetting, appState.workletNodeSetting.updateWorkletNodeSetting])

    return inputChunkNumRow
}