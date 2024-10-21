export function About() {
    const desc = [
        "24年回坑玩亚服，国服要回来还是感慨万千的。回坑一段时间之后,发现现在炉石卡组比以前复杂多了,又是备牌又是自定义卡牌的 导致营地分享卡组一直要问",
        "楼主 牛牛里是什么 奇利亚斯是啥模块",
        "于是趁着最近国服要来了 我做了一个分享工具用来方便分享卡组！",
        "可以输入卡组名称和作者，让你的地沟油卡组万古流芳（",
        "粘贴游戏代码，自动解析展示，牛牛和奇利亚斯都能看",
        "分享截图，二维码可以跳转回来，下面复制代码",
        "感觉功能有点简陋，我想来想去是想做一个手机端组卡的工具，用游戏 ui 组卡实在是不够方便。官网的那个组卡工具好是好，加载有点慢。 先做一个 mvp 版本出来，组卡工具后面划水的时候慢慢开发吧",
        "代码还是乱斗之后的烂摊子，但是还是来个 star 吧。",
    ]
    return (
        <div>
            <h1 className="text-xl font-bold">关于我</h1>
            {
                desc.map((d, i) => <p className="mt-1" key={i}>{d}</p>)
            }
            <p className="mt-2 font-bold">Github: <a className="text-blue-500" href="https://github.com/Alfxjx/HSDeck-mob" target="_blank">Alfxjx/HSDeck-mob</a></p>
        </div>
    )
}