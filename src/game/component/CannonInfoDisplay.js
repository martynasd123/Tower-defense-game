import {Component} from "../../engine/core/Component";
import {Mesh, MeshPhongMaterial, TextGeometry, Vector3} from "three";
import Assets from "../Assets";
import TextSprite from "@seregpie/three.text-sprite";

export class CannonInfoDisplay extends Component{

    constructor(entity) {
        super(entity);

        this.nameTextSprite = new TextSprite({
            alignment: 'center',
            color: '#000000',
            fontFamily: Assets.fonts.roboto_regular.font,
            fontSize: 2,
            fontStyle: 'normal',
            text: ''
        });
        this.nameTextSprite.position.add(new Vector3(0,8,0))
        this.nameTextSprite.name = 'name_text_sprite'

        this.healthTextSprite = new TextSprite({
            alignment: 'center',
            color: '#c0392b',
            fontFamily: Assets.fonts.roboto_regular.font,
            fontSize: 2,
            fontStyle: 'normal',
            text: ''
        });
        this.healthTextSprite.position.add(new Vector3(0,5.5,0))
        this.healthTextSprite.name = 'health_text_sprite'
    }

    update() {
        const health = this.getRemoteValue("hp")

        if(this.entity.visual.getObjectByName('health_text_sprite') == null){
            this.entity.visual.add(this.healthTextSprite)
        }
        if(this.entity.visual.getObjectByName('name_text_sprite') == null){
            this.entity.visual.add(this.nameTextSprite)
        }

        this.nameTextSprite.text = this.getRemoteValue("name")
        if(health === 0)
            this.healthTextSprite.text = 'Defeated'
        else
            this.healthTextSprite.text = ['♥','♥','♥','♥','♥'].splice(0, health).join('')

    }

}