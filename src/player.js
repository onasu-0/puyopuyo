class Player {
    static centerPuyoColor = 0;
    static rotatingPuyoColor = 0;
    static playerPuyoStatus = null;
    static centerPuyoElement = null;
    static rotatingPuyoElement = null;
    static groundedFrame = 0;

    //プレイヤーが操作するぷよを作る
    static createPlayerPuyo() {
        //ぷよぷよが置けるかどうか、1番上の段の左から3つめを確認する
        if (Stage.getPuyoInfo(2, 0)) {
            //空白でない場合は新しいぷよを置けない（ゲームオーバー）
            return false;
        }

        //新しいぷよの色を決める
        Player.centerPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;
        Player.rotatingPuyoColor = Math.trunc(Math.rondom() * Config.puyoColorMax) + 1;

        //新しいぷよ画像を作成する
        Player.centerぷよ・oElement = GameImage.getPuyoImage(Player.centerPuyoColor);
        Player.rotatingPuyoElement = GameImage.getPuyoImage(Player.rotatingPuyoColor);
        Stage.stageElement.appendChild(Player.centerPuyoElement);
        Stage.stageElement.appendChild(Player.rotatingPuyoElement);

        //ぷよの初期情報を定める
        Player.playerPuyoStatus = {
            x: 2,   //中心ぷよの位置：左から2列目
            y: -1,  //画面上部ギリギリから出てくる
            left: 2 * Config.puyoImageWidth,
            top: -1 * Config.puyoImageHeight,
            dx: 0,      //中心ぷよから見た回転するぷよの相対位置：回転するぷよは上方向にある（0, -1）
            dy: -1,
            rotation: 90    //画面上の回転するぷよの角度：90度（上向き）
        };
        //接地時間はゼロ
        Player.groundedFrame = 0;
        //ぷよを描画
        Player.setPlayerPuyoPosition();
        return true;
    }

    // playerPuyoStatusに従って、画面上のぷよの位置を更新する
    static setPlayerPuyoPosition() {
        //まず中心ぷよの位置を確定させる
        Player.centerPuyoElement.style.left = Player.playerPuyoStatus.left + 'px';
        Player.centerPuyoElement.style.top = Player.playerPuyoStatus.top + 'px';

        //次に回転するぷよの位置を計算する
        const x = Player.playerPuyoStatus.left + Math.cos(Player.playerPuyoStatus.rotation * Math.PI / 180) * Config.puyoImageWidth;
        const y = Player.playerPuyoStatus.top - Math.sin(Player.playerPuyoStatus.rotation * Math.PI / 180) * Config.puyoImageHeight;
        Player.rotatingPuyoElement.style.left = x + 'px';
        Player.rotatingPuyoElement.style.top = y + 'px';
    }

    //プレイヤーの操作ぷよを落下させる
    static dropPlayerPuyo() {
        let { x, y, dx, dy } = Player.playerPuyoStatus;

        //現状のプレイヤーの操作ぷよの下にぷよがあるか確認する
        if (!Stage.getPuyoInfo(x, y + 1) && !Stage.getPuyoInfo(x + dx, y + dy + 1)) {
            //中心ぷよ・回転するぷよ両方の下にぷよがいないので、自由落下してよい
            Player.playerPuyoStatus.top += Config.playerFallingSpeed;
            //自由落下した際、マス目の境界を超えていないか確認する
            if (Math.floor(Player.playerPuyoStatus.top / Config.puyoImageHeight) != y) {
                //ブロックの
}