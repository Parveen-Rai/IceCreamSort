package com.cocos.game;

import android.app.Activity;
import android.util.Log;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

import java.security.PublicKey;


public class AdManager {
    private static InterstitialAd interstitialAd;
    private static RewardedAd rewardedAd;
    private static Activity activity = null;
    private static final String LogTag = "AdManager";
    private static AdView bannerAdView;

    public static void initializeAdMob(Activity _mainActivity){
        activity = _mainActivity;
        MobileAds.initialize(activity,initializationStatus -> {
            Log.d(LogTag,"AdMobInitialized");
        });

    }


    public static void loadBannerView(String adUnitId,@NonNull String _top){
        runOnGLThread(()->{
            if(bannerAdView == null){
                bannerAdView = new AdView(activity);
                bannerAdView.setAdSize(AdSize.BANNER);
                bannerAdView.setAdUnitId(adUnitId);
                FrameLayout.LayoutParams adParams = new FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.MATCH_PARENT,
                        FrameLayout.LayoutParams.WRAP_CONTENT
                );
                if(_top.equals("TOP")){
                    adParams.gravity = Gravity.TOP;
                }else {
                    adParams.gravity = Gravity.BOTTOM;
                }

                activity.addContentView(bannerAdView,adParams);

                AdRequest adRequest = new AdRequest.Builder().build();
                bannerAdView.loadAd(adRequest);
                Log.d(LogTag,"BannerAdView loaded");
            }
        });
    }

    public static void hideBannerAd(){
        runOnGLThread(()->{
            if(bannerAdView!=null){
                bannerAdView.setVisibility(LinearLayout.GONE);
            }
        });
    }

    public static void showBannerAd(){
        runOnGLThread(()->{
            if(bannerAdView!=null){
                bannerAdView.setVisibility(LinearLayout.VISIBLE);
            }
        });
    }

    public static void destroyBannerAd(){
        runOnGLThread(()->{
            if(bannerAdView!=null){
                bannerAdView.destroy();
                bannerAdView = null;
            }
        });
    }

    public static void loadInterstitialAd(String adUnitId){
        runOnGLThread(()->{
            AdRequest adRequest = new AdRequest.Builder().build();
            InterstitialAd.load(activity, adUnitId, adRequest, new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd ad) {
                    super.onAdLoaded(ad);
                    interstitialAd = ad;
                }

                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    super.onAdFailedToLoad(loadAdError);
                    Log.d(LogTag,"FailedToLoadInterstitialAd : "+loadAdError.getMessage());
                    interstitialAd = null;
                }
            });
        });

    }

    public static void showInterstitialAd(){
        runOnGLThread(()->{
            if(interstitialAd!=null){
                interstitialAd.show(activity);
            }else{
                Log.d(LogTag,"ads not loaded");
            }
        });

    }

    public static void loadRewardedAd(String adUnitId){
        runOnGLThread(()->{
            AdRequest adRequest = new AdRequest.Builder().build();
            RewardedAd.load(activity, adUnitId, adRequest, new RewardedAdLoadCallback() {
                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    super.onAdFailedToLoad(loadAdError);
                    Log.d(LogTag,"Rewarded ads not loaded");
                    rewardedAd = null;
                }

                @Override
                public void onAdLoaded(@NonNull RewardedAd ad) {
                    super.onAdLoaded(ad);
                    rewardedAd = ad;
                }
            });
        });

    }

    public static  void showRewardedAd(){
        final boolean[] rewardEarned = {false};
        final int[] reward = {0};
        try {
            runOnGLThread(()->{
                if(rewardedAd!=null){
                    rewardedAd.show(activity, new OnUserEarnedRewardListener() {
                        @Override
                        public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                            rewardEarned[0] = true;
                            reward[0] = rewardItem.getAmount();
                        }
                    });

                    rewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                        @Override
                        public void onAdShowedFullScreenContent() {
                            super.onAdShowedFullScreenContent();
                        }

                        @Override
                        public void onAdImpression() {
                            super.onAdImpression();
                        }

                        @Override
                        public void onAdFailedToShowFullScreenContent(@NonNull AdError adError) {
                            super.onAdFailedToShowFullScreenContent(adError);
                        }

                        @Override
                        public void onAdDismissedFullScreenContent() {
                            super.onAdDismissedFullScreenContent();
                            if(rewardEarned[0]){
                                CocosHelper.runOnGameThread(()->{
                                    CocosJavascriptJavaBridge.evalString("window.onRewardedAdCompleted("+reward[0]+");");
                                });
                            }

                        }

                        @Override
                        public void onAdClicked() {
                            super.onAdClicked();
                        }
                    });
                }else{
                    Log.d(LogTag,"Rewarded Ad Not Loaded");
                    CocosHelper.runOnGameThread(()->{
                        CocosJavascriptJavaBridge.evalString("window.onAdNotLoaded();");
                    });

                }
            });
        }catch (Exception e){
            Log.d(LogTag,"ERROR IN CALL " + e.getMessage());
        }


    }


    private static void runOnGLThread(Runnable runnable){
        activity.runOnUiThread(runnable);
    }
}
