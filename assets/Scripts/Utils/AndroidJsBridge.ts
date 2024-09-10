import { native } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

const INTERSTITIAL_AD_ID = "ca-app-pub-8856913399600283/4409225396";
const REWARDED_AD_ID = "ca-app-pub-8856913399600283/4409225396";
const BANNER_AD_ID = "ca-app-pub-8856913399600283/8416753168";

const ANDROID_AD_MANAGER_PATH = "com/cocos/game/AdManager";

declare global{
    interface Window{
        onRewardedAdCompleted: (params:any) => void;
    }
}

window.onRewardedAdCompleted = function(val){
    console.log("RewardCompleted" ,val);
}

@ccclass('AndroidJsBridge')
export class AndroidJsBridge {

    loadBannerAd() {
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,                              //Class path
                "loadBannerView",                                     // function signature
                "(Ljava/lang/String;Ljava/lang/String;)V",            //method signature
                BANNER_AD_ID,                                         //paramters
                "bottom"                                              //...
            )
        } catch (error) {
            console.log("Error in loadBannerAd", error);
        }

    }

    loadInterstitialAd() {
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "loadInterstitialAd",
                "(Ljava/lang/String;)V",
                INTERSTITIAL_AD_ID
            );
        } catch (error) {
            console.log("Error in loading interstitialAd ", error)
        }
    }

    loadRewardedAd() {
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "loadRewardedAd",
                "(Ljava/lang/String;)V",
                REWARDED_AD_ID
            );
        } catch (error) {
            console.log("Error in loading interstitialAd ", error)
        }
    }

    showInterstitialAd() {
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "showInterstitialAd",
                "()V"
            );
        } catch (error) {
            console.log('Error in showing interstitial ', error)
        }
    }

    showRewardedAd() {
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "showRewardedAd",
                "()V"
            );
        } catch (error) {
            console.log('Error in showing interstitial ', error)
        }
    }

    showBannerAd(){
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "showBannerAd",
                "()V"
            );
        } catch (error) {
            console.log('Error in showing Banner ', error)
        }
    }

    hideBannerAd(){
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "showBannerAd",
                "()V"
            );
        } catch (error) {
            console.log('Error in showing Banner ', error)
        }
    }

    destroyBannerAd(){
        try {
            native.reflection.callStaticMethod(
                ANDROID_AD_MANAGER_PATH,
                "destroyBannerAd",
                "()V"
            );
        } catch (error) {
            console.log('Error in destroying Banner ', error)
        }
    }
}


