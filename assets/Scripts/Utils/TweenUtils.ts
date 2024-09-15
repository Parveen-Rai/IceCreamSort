import { _decorator, Node, tween, Vec3, Tween, UIOpacity, Quat, TweenEasing, easing } from 'cc';
const { ccclass } = _decorator;

@ccclass('TweenUtils')
export class TweenUtils {
    /**
     * Moves a node to a target position over a specified duration.
     * @param node The node to move.
     * @param duration The duration of the movement in seconds.
     * @param targetPos The target position to move to.
     * @param _easingFunc easing function for animation curve
     */
    moveTo(node: Node, duration: number, targetPos: Vec3, _easingFunc:TweenEasing = 'linear',callback: (() => void) | null = null) {
        return tween(node)
            .to(duration, { position: targetPos },{easing:_easingFunc})
            .call(()=>{
                if(callback!=null){
                    callback();
                }
            })
            .start();
    }

    /**
     * Moves a node by a target position over a specified duration.
     * @param node The node to move.
     * @param duration The duration of the movement in seconds.
     * @param targetPos The target position to move to.
     * @param _easingFunc easing function for animation curve
     */
    moveBy(node: Node, duration: number, targetPos: Vec3, _easingFunc:TweenEasing = 'linear') {
        return tween(node)
            .by(duration, { position: targetPos },{easing:_easingFunc})
            .start();
    }

    /**
     * Scales a node to a target scale over a specified duration.
     * @param node The node to scale.
     * @param duration The duration of the scaling in seconds.
     * @param targetScale The target scale to scale to.
     * @param _easingFunc easing function for animation curve
     */
    scaleTo(node: Node, duration: number, targetScale: Vec3, _easingFunc:TweenEasing = 'linear') {
        return tween(node)
            .to(duration, { scale: targetScale },{easing:_easingFunc})
            .start();
    }

    /**
     * Scales a node by a target scale over a specified duration.
     * @param node The node to scale.
     * @param duration The duration of the scaling in seconds.
     * @param targetScale The target scale to scale to.
     * @param _easingFunc easing function for animation curve
     */
    scaleBy(node: Node, duration: number, targetScale: Vec3, _easingFunc:TweenEasing = 'linear') {
        return tween(node)
            .by(duration, { scale: targetScale })
            .start();
    }

    /**
     * Rotates a node to a target rotation over a specified duration.
     * @param node The node to rotate.
     * @param duration The duration of the rotation in seconds.
     * @param targetRotation The target rotation in degrees (Euler angles).
     */
    rotateTo(node: Node, duration: number, targetRotation: Quat) {
        return tween(node)
            .to(duration, { rotation : targetRotation })
            .start();
    }

    /**
     * Rotates a node by a target rotation over a specified duration.
     * @param node The node to rotate.
     * @param duration The duration of the rotation in seconds.
     * @param targetRotation The target rotation in degrees (Euler angles).
     */
    rotateBy(node: Node, duration: number, targetRotation: Quat) {
        return tween(node)
            .by(duration, { rotation : targetRotation })
            .start();
    }

    /**
     * Fades a node to a target opacity over a specified duration.
     * Assumes the node has a component with a `color` property (e.g., Sprite, Label).
     * @param node The node to fade.
     * @param duration The duration of the fade in seconds.
     * @param targetOpacity The target opacity (0 to 255).
     */
    fadeTo(node: UIOpacity, duration: number, targetOpacity: number) {
        return tween(node)
            .to(duration, { opacity:targetOpacity})
            .start();
    }

    /**
     * Executes a sequence of tweens in order.
     * @param node The node to apply the tweens to.
     * @param tweenActions An array of tween actions.
     */
    sequence(node: Node, tweenActions: Array<Tween<any>>) {
        const seq = tween(node).sequence(...tweenActions);
        seq.start();
        return seq;
    }

    /**
     * Executes tweens in parallel.
     * @param node The node to apply the tweens to.
     * @param tweenActions An array of tween actions.
     */
    parallel(node: Node, tweenActions: Array<Tween<any>>) {
        const par = tween(node).parallel(...tweenActions);
        par.start();
        return par;
    }

     /**
     * Squash animation: The node squashes down (scales on Y axis) and stretches (scales on X axis),
     * then returns to its original shape.
     * @param node The node to animate.
     * @param duration The duration of the squash and stretch.
     * @param squashAmount How much to squash (e.g., 0.7 for a slight squash).
     */
     squash(node: Node, duration: number, squashAmount: number = 0.7) {
        const originalScale = node.scale.clone();  // Store the original scale

        return tween(node)
            // Squash down and stretch horizontally
            .to(duration * 0, { scale: new Vec3(originalScale.x * 1.2, originalScale.y * squashAmount, originalScale.z) }, { easing: 'quadOut' })
            // Return to the original scale
            .to(duration * 0.5, { scale: originalScale }, { easing: 'quadIn' })
            .start();
    }
}
