/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：保存静态字符串
 */
export class StaticStr {
	/**
	 * 默认参数错误状态码
	 */
    public static ERR_CODE_DEFAULT = 403;
	/**
	 * 默认成功返回状态码
	 */
    public static SUCCESS_CODE_DEFAULT = 200;
    /**
	 * 验证码错误
	 */
    public static ERR_CAPTCHA_CODE= "验证码错误!请点击验证码重新获取!";
    /**
	 * 邮箱错误
	 */
    public static ERR_EMAIL_CODE= "邮箱格式错误!";
    /**
	 * 邮箱错误
	 */
    public static ERR_EMAILCO_CODE= "邮箱已经被使用!";
    /**
	 * 邮箱错误
	 */
    public static ERR_EMAILCO2_CODE= "请输入正确邮箱地址!";
	/**
	 * 默认错误提示字符
	 */
    public static DEFAULT = "信息错误";
	/**
	 * 后台接收参数验证错误默认提示文字
	 */
    public static ERR_MSG_VERIFY_DEFAULT = "参数错误";
	/**
	 * 不检查name
	 */
    public static WC_NO_CHECK = "NO_CHECK";
	/**
	 *snsapi_userinfo可以获取用户信息与token与openid
	 *snsapi_base只能获取到token与openid
	 */
    public static SNSAPI = "snsapi_base";
	/**
	 * 微信支付是否支持信用卡支付
	 */
    public static LIMITPAY = "no_credit";
	/**
	 * 企业转账默认备注
	 * ：备注中的敏感词会被转成字符*
	 */
    public static WC_DESC = "用户提现";
	/**
	 * 企业转账默认ip
	 */
    public static WC_IP = "127.0.0.1";
	/**
	 * 企业红包ip
	 */
    public static WR_IP = "127.0.0.1";
	/**
	 * 企业转账失败字符串
	 */
    public static WC_ERR_MSG = "企业转账发起失败";
	/**
	 * 用户名错误提示
	 */
    public static USERNAME_ERR_MSG = "用户名或密码错误";
	/**
	 * 注册错误提示
	 */
    public static INSERT_ERR_MSG = "名称已存在";
	/**
	 * 获取等级贡献配置表ervice
	 */
    public static ERR_MSG_GD_F = "等级贡献配置不存在";
	/**
	 * 查询全局配置Service
	 */
    public static ERR_MSG_SYS_F = "系统设置不存在";
}
