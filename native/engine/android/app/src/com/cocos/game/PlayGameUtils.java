package com.cocos.game;

import static com.cocos.lib.GlobalObject.getActivity;

import android.app.Activity;

import com.google.android.gms.games.GamesSignInClient;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.PlayGamesSdk;

public class PlayGameUtils {

    public static void initializePlayGame(Activity _mainActivity){
        PlayGamesSdk.initialize(_mainActivity);
    }

    public static void signInListener(){
        GamesSignInClient gamesSignInClient = PlayGames.getGamesSignInClient(getActivity());

        gamesSignInClient.isAuthenticated().addOnCompleteListener(isAuthenticatedTask -> {
            boolean isAuthenticated =
                    (isAuthenticatedTask.isSuccessful() &&
                            isAuthenticatedTask.getResult().isAuthenticated());

            if (isAuthenticated) {
                // Continue with Play Games Services
            } else {
                // Disable your integration with Play Games Services or show a
                // login button to ask  players to sign-in. Clicking it should
                // call GamesSignInClient.signIn().
            }
        });
    }
}
