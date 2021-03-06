import {app, BrowserWindow} from "electron"
import {EventEmitter} from "events"
import { getUrl } from "./utils"

export default class Windows extends EventEmitter {
    windows = new Map()
    application = null
    constructor(application){
        super()
        this.application = application
    }
    createLoginWindow(){
        const win = new BrowserWindow({
            width: 480,
            height: 360,
            show: false,
            webPreferences: {
                preload: `${app.getAppPath()}/build/view-preload.bundle.js`,
                contextIsolation: true
            }
        })
        win.loadURL(getUrl("login.html"))
        this.windows.set("login", win)
        win.on("closed", () => {
            this.windows.delete("login")
            app.exit()
        })
    }
    createMainWindow(){
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
            webPreferences: {
                preload: `${app.getAppPath()}/build/view-preload.bundle.js`,
                contextIsolation: true
            }
        })
        win.loadURL(getUrl("master.html"))
        win.on("closed", () => {
            this.windows.delete("main")
            app.exit()
        })
        this.windows.set("main", win)
    }
    init(){
        this.createMainWindow()
        this.createLoginWindow()
    }
}
