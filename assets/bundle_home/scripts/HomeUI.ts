import * as cc from "cc";
import { Animation, Component, _decorator } from "cc";
import { MessageBox } from "../../../extensions/hotup-encrypt-crash/assets/hotupdate/Components/MessageBox";
import { hotupdate } from "../../../extensions/hotup-encrypt-crash/assets/hotupdate/Util/CheckUpdate";
import { NewDelayPromise } from "../../../extensions/hotup-encrypt-crash/assets/hotupdate/Util/NewPromise";
import { UpdateHelper } from "../../../extensions/hotup-encrypt-crash/assets/hotupdate/Util/UpdateHelper";
import { BackPackUI } from "./BackPackUI";
import { ChallengeUI } from "./ChallengeUI";
import { PanelType } from "./PanelType";
import { ShopUI } from "./ShopUI";
const { ccclass, property } = _decorator;

@ccclass
export class HomeUI extends Component {
    @property(Animation)
    menuAnim: Animation = null!;
    // @property(BackPackUI)
    backPackUI: BackPackUI = null!;
    // @property(ShopUI)
    shopUI: ShopUI = null!;
    // @property(ChallengeUI)
    challengeUI: ChallengeUI = null!;
    @property(cc.Node)
    nodeUI: cc.Node = null!;

    public curPanel = PanelType.Home;

    // use this for initialization
    onLoad() {
        this.curPanel = PanelType.Home;
        // this.menuAnim.play('menu_reset');
    }

    start() {
        // this.backPackUI.init(this);
        // this.shopUI.init(this, PanelType.Shop);
        // this.challengeUI.init(this);
        this.scheduleOnce(() => {
            this.menuAnim.play('menu_intro');
        }, 0.5);
    }

    gotoBackPack() {
        if (!this.backPackUI) {
            if (!UpdateHelper.hasPackID("bundle_back")) {
                MessageBox.showBox("提示", `掠夺子包还未下载！`)
                return
            }
            cc.assetManager.loadBundle("bundle_back", (error, data) => {
                data.load("backPack", cc.Prefab, (err, prefab) => {
                    if (error) {
                        MessageBox.showBox("系统错误", `加载掠夺子包错误！\nerror:${error}`)
                        return
                    }
                    this.backPackUI = cc.instantiate(prefab).getComponent(BackPackUI);
                    this.nodeUI.addChild(this.backPackUI.node)
                    this.backPackUI.init(this);
                    this.backPackUI.show();
                })
            })
            return;
        }
        this.backPackUI.show();
    }

    gotoChallenge() {
        if (!this.challengeUI) {
            if (!UpdateHelper.hasPackID("bundle_back")) {
                MessageBox.showBox("提示", `掠夺子包还未下载！`)
                return
            }
            cc.assetManager.loadBundle("bundle_back", (error, data) => {
                data.load("chanllenge", cc.Prefab, (err, prefab) => {
                    if (error) {
                        MessageBox.showBox("系统错误", `加载掠夺子包错误！\nerror:${error}`)
                        return
                    }
                    this.challengeUI = cc.instantiate(prefab).getComponent(ChallengeUI);
                    this.nodeUI.addChild(this.challengeUI.node)
                    this.challengeUI.init(this);
                    this.challengeUI.show();
                })
            })
            return;
        }
        this.challengeUI.show();
    }

    gotoShop() {
        if (this.curPanel !== PanelType.Shop) {
            if (!this.shopUI) {
                if (!UpdateHelper.hasPackID("bundle_shop")) {
                    MessageBox.showBox("提示", `商店子包还未下载！`)
                    return
                }
                cc.assetManager.loadBundle("bundle_shop", (error, data) => {
                    if (error) {
                        MessageBox.showBox("系统错误", `加载商店子包错误！\nerror:${error}`)
                        return
                    }
                    data.load("Shop", cc.Prefab, (err, prefab) => {
                        this.shopUI = cc.instantiate(prefab).getComponent(ShopUI);
                        this.nodeUI.addChild(this.shopUI.node)
                        this.shopUI.init(this, PanelType.Shop);
                        this.shopUI.show();
                    })
                })
                return;
            }
            this.shopUI.show();
        }
    }

    gotoHome() {
        if (this.curPanel === PanelType.Shop) {
            this.shopUI.hide();
            this.curPanel = PanelType.Home;
        }
    }

    async testCaughtCrash() {
        //测试已捕获异常
        try {
            await NewDelayPromise(100)


            throw "testCaughtCrash"



        } catch (error) {

        }
    }

    testUncaughtException() {
        //测试未捕获异常


        throw "testUncaughtCrash"



    }

    lookCrashLog(){
        cc.sys.openURL("http://127.0.0.1/demo/crash_log")
    }
}
