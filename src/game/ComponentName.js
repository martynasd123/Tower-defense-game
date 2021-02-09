import {CameraControlsManager} from "./component/CameraControlsManager";
import {CannonController} from "./component/CannonController";
import {CameraInfo} from "./component/CameraInfo";
import Projectile from "./component/Projectile";
import {CannonInfoDisplay} from "./component/CannonInfoDisplay";

export default {
    cameraController: CameraControlsManager,
    cannonController: CannonController,
    cameraInfo: CameraInfo,
    projectile: Projectile,
    cannonInfoDisplay: CannonInfoDisplay
}