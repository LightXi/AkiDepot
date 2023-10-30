import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Button,
    Divider,
    FormControl,
    Link,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import API from "../../middleware/Api";
import Auth from "../../middleware/Auth";
import { bufferDecode, bufferEncode } from "../../utils/index";
import {
    EmailOutlined,
    Fingerprint,
    VpnKey,
    VpnKeyOutlined,
} from "@material-ui/icons";
import VpnIcon from "@material-ui/icons/VpnKeyOutlined";
import { useLocation } from "react-router";
import { useCaptcha } from "../../hooks/useCaptcha";
import {
    applyThemes,
    setSessionStatus,
    toggleSnackbar,
} from "../../redux/explorer";
import { useTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
    return {
    wrapper: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        alignItems: "center",
    },
    background: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "52vw",
        height: "100%",
        overflow: "hidden",
        flexShrink: 1,
        [theme.breakpoints.down("sm")]: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "calc(100vw + 2px)",
            height: "calc(100vh + 2px)",
        },
        "& .logo": {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "max-content",
            height: "max-content",
            userSelect: "none",
            "& img": {
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                padding: "4px",
                background: "#fff",
                [theme.breakpoints.down("sm")]: {
                    display: "none",
                },
            },
            "& p": {
                fontSize: "20px",
                userSelect: "none",
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0 0 4px rgba(0,0,0,.2)",
                marginTop: "16px",
                [theme.breakpoints.down("sm")]: {
                    display: "none",
                },
            }
        },
        "& .image": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: -1,
            background: "url(https://cdn.lightxi.com/cloudreve/uploads/2023/02/03/Z19Mk1IK_waf_block.png) center no-repeat !important",
            backgroundSize: "cover !important",
            minWidth: "100%",
            maxWidth: "60vw",
            minHeight: "calc(100vh + 2px)",
        }
    },
    layout: {
        width: "auto",
        minWidth: "42vw",
        height: "max-content",
        transform: "translateY(-32px)",
        flexGrow: 1,
        flexShrink: 0,
        padding: "0 min(72px, 5vw)",
        [theme.breakpoints.up("sm")]: {
            width: 400,
        },
        [theme.breakpoints.down("sm")]: {
            margin: "110px auto",
            minWidth: 0,
            width: "100%",
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
            3
        )}px`,
        background: `${theme.palette.background.paper}f2`,
        backdropFilter: "blur(10px)",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "unset",
        borderRadius: "50%",
        boxShadow: "0 0 4px 2px rgba(0,0,0,.02)",
        "& img": {
            width: "100%",
            height: "100%",
        }
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    link: {
        marginTop: "20px",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
    },
    buttonContainer: {
        display: "flex",
    },
    authnLink: {
        textAlign: "center",
        marginTop: 16,
        [theme.breakpoints.down("sm")]: {
            boxShadow: "0px 2px 1px -1px rgba(197,204,230,0.2),0px 1px 1px 0px rgba(197,204,230,0.14),0px 1px 3px 0px rgba(197,204,230,0.12)",
            borderRadius: 4,
            background: "rgba(255,255,255,.95)",
            backdropFilter: "blur(4px)",
            overflow: "hidden",
        },
        "& .action": {
            width: "100%",
            borderRadius: 4,
        }
    },
    copyright: {
        textAlign: "center",
        marginTop: "24px",
        color: "#999",
        textDecoration: "none",
        "& a": {
            color: "#2289fd",
            textDecoration: "none",
            marginLeft: 4,
        },
        [theme.breakpoints.down("sm")]: {
            color: "#fff",
        }
    },
    credit: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "4px",
        marginTop: "5vh",
        "& a": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            color: "#999",
            textDecoration: "none",
            "& img": {
                width: "16px",
                height: "16px",
            }
        }
    }
    }
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function LoginForm() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [loading, setLoading] = useState(false);
    const [useAuthn, setUseAuthn] = useState(false);
    const [twoFA, setTwoFA] = useState(false);
    const [faCode, setFACode] = useState("");

    const loginCaptcha = useSelector((state) => state.siteConfig.loginCaptcha);
    const registerEnabled = useSelector(
        (state) => state.siteConfig.registerEnabled
    );
    const title = useSelector((state) => state.siteConfig.title);
    const authn = useSelector((state) => state.siteConfig.authn);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useDispatch();
    const ToggleSnackbar = useCallback(
        (vertical, horizontal, msg, color) =>
            dispatch(toggleSnackbar(vertical, horizontal, msg, color)),
        [dispatch]
    );
    const ApplyThemes = useCallback(
        (theme) => dispatch(applyThemes(theme)),
        [dispatch]
    );
    const SetSessionStatus = useCallback(
        (status) => dispatch(setSessionStatus(status)),
        [dispatch]
    );

    const history = useHistory();
    const location = useLocation();
    const {
        captchaLoading,
        isValidate,
        validate,
        CaptchaRender,
        captchaRefreshRef,
        captchaParamsRef,
    } = useCaptcha();
    const query = useQuery();

    const classes = useStyles();

    useEffect(() => {
        setEmail(query.get("username"));
    }, [location]);

    const afterLogin = (data) => {
        Auth.authenticate(data);

        // 设置用户主题色
        if (data["preferred_theme"] !== "") {
            ApplyThemes(data["preferred_theme"]);
        }

        // 设置登录状态
        SetSessionStatus(true);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (query.get("redirect")) {
            history.push(query.get("redirect"));
        } else {
            history.push("/home");
        }
        ToggleSnackbar("top", "right", t("login.success"), "success");

        localStorage.removeItem("siteConfigCache");
    };

    const authnLogin = (e) => {
        e.preventDefault();
        if (!navigator.credentials) {
            ToggleSnackbar(
                "top",
                "right",
                t("login.browserNotSupport"),
                "warning"
            );

            return;
        }

        setLoading(true);

        API.get("/user/authn/" + email)
            .then((response) => {
                const credentialRequestOptions = response.data;
                console.log(credentialRequestOptions);
                credentialRequestOptions.publicKey.challenge = bufferDecode(
                    credentialRequestOptions.publicKey.challenge
                );
                credentialRequestOptions.publicKey.allowCredentials.forEach(
                    function (listItem) {
                        listItem.id = bufferDecode(listItem.id);
                    }
                );

                return navigator.credentials.get({
                    publicKey: credentialRequestOptions.publicKey,
                });
            })
            .then((assertion) => {
                const authData = assertion.response.authenticatorData;
                const clientDataJSON = assertion.response.clientDataJSON;
                const rawId = assertion.rawId;
                const sig = assertion.response.signature;
                const userHandle = assertion.response.userHandle;

                return API.post(
                    "/user/authn/finish/" + email,
                    JSON.stringify({
                        id: assertion.id,
                        rawId: bufferEncode(rawId),
                        type: assertion.type,
                        response: {
                            authenticatorData: bufferEncode(authData),
                            clientDataJSON: bufferEncode(clientDataJSON),
                            signature: bufferEncode(sig),
                            userHandle: bufferEncode(userHandle),
                        },
                    })
                );
            })
            .then((response) => {
                afterLogin(response.data);
            })
            .catch((error) => {
                console.log(error);
                ToggleSnackbar("top", "right", error.message, "warning");
            })
            .then(() => {
                setLoading(false);
            });
    };

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!isValidate.current.isValidate && loginCaptcha) {
            validate(() => login(e), setLoading);
            return;
        }
        API.post("/user/session", {
            userName: email,
            Password: pwd,
            ...captchaParamsRef.current,
        })
            .then((response) => {
                setLoading(false);
                if (response.rawData.code === 203) {
                    setTwoFA(true);
                } else {
                    afterLogin(response.data);
                }
            })
            .catch((error) => {
                setLoading(false);
                ToggleSnackbar("top", "right", error.message, "warning");
                captchaRefreshRef.current();
            });
    };

    const twoFALogin = (e) => {
        e.preventDefault();
        setLoading(true);
        API.post("/user/2fa", {
            code: faCode,
        })
            .then((response) => {
                setLoading(false);
                afterLogin(response.data);
            })
            .catch((error) => {
                setLoading(false);
                ToggleSnackbar("top", "right", error.message, "warning");
            });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.background}>
                <div className={"logo"}>
                    <img src={`/logo.svg`} alt={``} />
                    <p> {title} </p>
                </div>
                <div className={"image"} />
            </div>
            <div className={classes.layout}>
                {!twoFA && (
                    <>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <img src={`/logo.svg`} alt={``} />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {t("login.title", { title })}
                            </Typography>
                            {!useAuthn && (
                                <form className={classes.form} onSubmit={login}>
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            label={t("login.email")}
                                            variant={"outlined"}
                                            inputProps={{
                                                id: "email",
                                                type: "email",
                                                name: "email",
                                            }}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            InputProps={{
                                                startAdornment: !isMobile && (
                                                    <InputAdornment position="start">
                                                        <EmailOutlined />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            autoComplete
                                            value={email}
                                            autoFocus
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            variant={"outlined"}
                                            label={t("login.password")}
                                            inputProps={{
                                                name: "password",
                                                type: "password",
                                                id: "password",
                                            }}
                                            onChange={(e) => setPwd(e.target.value)}
                                            InputProps={{
                                                startAdornment: !isMobile && (
                                                    <InputAdornment position="start">
                                                        <VpnKeyOutlined />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={pwd}
                                            autoComplete
                                        />
                                    </FormControl>
                                    {loginCaptcha && <CaptchaRender />}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            loading ||
                                            (loginCaptcha ? captchaLoading : false)
                                        }
                                        className={classes.submit}
                                    >
                                        {t("login.signIn")}
                                    </Button>
                                </form>
                            )}
                            {useAuthn && (
                                <form className={classes.form}>
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            variant={"outlined"}
                                            label={t("login.email")}
                                            InputProps={{
                                                id: "email",
                                                type: "email",
                                                name: "email",
                                                startAdornment: !isMobile && (
                                                    <InputAdornment position="start">
                                                        <EmailOutlined />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            autoComplete
                                            value={email}
                                            autoFocus
                                            required
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        onClick={authnLogin}
                                        className={classes.submit}
                                    >
                                        {t("login.continue")}
                                    </Button>
                                </form>
                            )}
                            <Divider />
                            <div className={classes.link}>
                                <div>
                                    <Link component={RouterLink} to={"/forget"}>
                                        {t("login.forgetPassword")}
                                    </Link>
                                </div>
                                <div>
                                    {registerEnabled && (
                                        <Link component={RouterLink} to={"/signup"}>
                                            {t("login.signUpAccount")}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Paper>

                        {authn && (
                            <div className={classes.authnLink}>
                                <Button
                                    className={`action`}
                                    color="primary"
                                    onClick={() => setUseAuthn(!useAuthn)}
                                >
                                    {!useAuthn && (
                                        <>
                                            <Fingerprint
                                                style={{
                                                    marginRight: 8,
                                                }}
                                            />
                                            {t("login.useFIDO2")}
                                        </>
                                    )}
                                    {useAuthn && (
                                        <>
                                            <VpnKey
                                                style={{
                                                    marginRight: 8,
                                                }}
                                            />
                                            {t("login.usePassword")}
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
                {twoFA && (
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <VpnIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {t("login.2FA")}
                        </Typography>
                        <form className={classes.form} onSubmit={twoFALogin}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    label={t("login.input2FACode")}
                                    variant={"outlined"}
                                    inputProps={{
                                        id: "code",
                                        type: "number",
                                        name: "code",
                                    }}
                                    onChange={(event) =>
                                        setFACode(event.target.value)
                                    }
                                    autoComplete
                                    value={faCode}
                                    autoFocus
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                className={classes.submit}
                            >
                                {t("login.continue")}
                            </Button>{" "}
                        </form>{" "}
                        <Divider />
                    </Paper>
                )}

                <div className={classes.copyright}>
                    © 2023
                    <a href={"https://www.lightxi.com"} target={"_blank"} rel={"noreferrer"}>
                        LightXi
                    </a>
                </div>
                <div className={classes.credit}>
                    <a href={`https://beian.miit.gov.cn/`} target={"_blank"} rel={"noreferrer"}>
                        <img src={`/static/beian/gov.webp`} alt={``} />
                        粤ICP备2023066011号-4
                    </a>
                    <a href={`https://dxzhgl.miit.gov.cn/dxxzsp/xkz/xkzgl/resource/qiyesearch.jsp?num=B1-20234898&type=xuke`} target={"_blank"} rel={"noreferrer"}>
                        <img src={`/static/beian/cert.webp`} alt={``} />
                        增值电信业务经营许可证 B1-20234898
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
