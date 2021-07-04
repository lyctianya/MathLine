/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 *
 * @Author: TrueMan
 * @Date: 2020-05-11 14:03:43
 * @LastEditTime: 2021-07-02 17:37:25
 * @LastEditors: your name
 * @Description:
 * @FilePath: /mathLine/assets/Script/Helloworld.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = "hello";

    start() {
        // init logic
        this.label.string = this.text;
    }
}
