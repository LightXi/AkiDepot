import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            padding: "12px",
            margin: 0,
            background: "#f5f7fa",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
        },
        landing: {
            width: "max-content",
            height: "max-content",
            margin: "2.5vh 5vw",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "3.5rem",
            padding: "1rem 8rem 3rem 6rem",
            background: "#fff",
            borderRadius: "12px",
            alignItems: "center",
            boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.12)",
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                padding: "2rem 6rem 4rem 6rem",
            },
            userSelect: "none",
            "& .image": {
                width: "25vw",
                "& img": {
                    width: "100%",
                    height: "100%",
                    draggable: false,
                    userDrag: "none",
                    "-moz-user-drag": "none",
                    "-webkit-user-drag": "none",
                    "-ms-user-drag": "none",
                    borderRadius: "12px",
                },
                [theme.breakpoints.down("sm")]: {
                    width: "100%",
                    maxWidth: "220px",
                },
                [theme.breakpoints.up("sm")]: {
                    transform: "translateX(-10%)",
                }
            },
            "& .content": {
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                userSelect: "none",
                [theme.breakpoints.down("sm")]: {
                    textAlign: "center",
                    alignItems: "center",
                },
                "& .title": {
                    display: "flex",
                    fontSize: "2.5rem",
                    userSelect: "none",
                    fontFamily: "Roboto, Ubuntu, monospace, system-ui, sans-serif",
                    background: "linear-gradient(to bottom right, #71b4ff 0%, #0061d7 100%)",
                    backgroundClip: "border-box",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                    "&:after": {
                        content: "'©'",
                        fontSize: "1rem",
                        marginTop: "0.5rem",
                        marginLeft: "2px",
                    }
                },
                "& .subtitle": {
                    fontSize: "1.75rem",
                },
                "& .description": {
                    fontSize: "1rem",
                    color: "#444",
                },
                "& > *": {
                    margin: 0,
                },
                "& .action": {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: "1.25rem",
                    gap: "12px",

                    "& button": {
                        padding: "0.75rem 1.5rem",
                        fontSize: "1rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 0.2s ease-in-out",
                        "&.register": {
                            background: "rgb(55, 125, 255)",
                            color: "#fff",
                            border: "none",
                            "&:hover": {
                                background: "rgb(25,107,253)",
                                boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.12)",
                            }
                        },
                        "&.login": {
                            background: "#fff",
                            color: "rgb(55, 125, 255)",
                            border: "1px solid rgb(55, 125, 255)",
                            "&:hover": {
                                color: "rgb(25,107,253)",
                                boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.12)",
                            }
                        }
                    }
                }
            }
        },
        copyright: {
            textAlign: "center",
            marginTop: "4rem",
            color: "#999",
            textDecoration: "none",
            userSelect: "none",
            "& a": {
                color: "#2289fd",
                textDecoration: "none",
                marginLeft: 4,
            },
        },
        credit: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "4px",
            "& a": {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                color: "#999",
                textDecoration: "none",
                transition: "0.2s",
                "& img": {
                    width: "16px",
                    height: "16px",
                },
                "&:hover": {
                    color: "#666",
                }
            },
            marginBottom: "2rem",
        },
        features: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "12px",
            padding: "0 12px",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            "& .feature": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "#fff",
                borderRadius: "12px",
                padding: "16px 24px",
                boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.12)",
                maxWidth: "200px",
                minHeight: "160px",
                textAlign: "center",
                "& svg": {
                    width: "36px",
                    height: "36px",
                    padding: "6px",
                    margin: "2px",
                    borderRadius: "6px",
                    color: "#2289fd",
                    background: "rgba(34, 137, 253, 0.1)",
                    boxShadow: "0 0 4px 0 rgba(34, 137, 253, 0.05)",
                },
                "& .title": {
                    fontSize: "1rem",
                    color: "#111",
                },
                "& .description": {
                    fontSize: "0.75rem",
                    color: "#666",
                }
            }
        }
    }
});

function IndexPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.landing}>
                <div className="image">
                    <img src={`/static/banner/land.svg`} alt="" />
                </div>
                <div className="content">
                    <div className="title">AkiDepot</div>
                    <div className="subtitle">秋储云谷</div>
                    <div className="description">秋储云谷，春蓄花纳</div>
                    <div className="action">
                        <button className="register">注册</button>
                        <button className="login">登录</button>
                    </div>
                </div>
            </div>
            <div className={classes.features}>
                <div className="feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge-circle"><path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/><circle cx="12" cy="12" r="2"/><path d="M13.4 10.6 19 5"/></svg>
                    <div className="title">传输不限速</div>
                    <div className="description">秋储云谷提供高速稳定的传输服务，让您的数据传输更加快速</div>
                </div>
                <div className="feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                    <div className="title">多平台支持</div>
                    <div className="description">多平台支持，让您的数据随时随地都能访问</div>
                </div>
                <div className="feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                    <div className="title">数据安全保障</div>
                    <div className="description">秋储云谷提供异地多备份和数据加密，让您的数据更加安全</div>
                </div>
            </div>
            <div className={classes.copyright}>
                © 2023
                <a href={"https://www.lightxi.com"} target={"_blank"} rel={"noreferrer"}>
                    LightXi
                </a>
            </div>
            <div className={classes.credit}>
                <a href={`https://beian.miit.gov.cn/`} target={"_blank"} rel={"noreferrer"}>
                    <img src={`https://lightxi.com/themes/web/mfQloud/assets/images/gov.webp`} alt={``} />
                    粤ICP备2023066011号-4
                </a>
                <a href={`https://dxzhgl.miit.gov.cn/dxxzsp/xkz/xkzgl/resource/qiyesearch.jsp?num=B1-20234898&type=xuke`} target={"_blank"} rel={"noreferrer"}>
                    <img src={`https://lightxi.com/themes/web/mfQloud/assets/images/cert.webp`} alt={``} />
                    增值电信业务经营许可证 B1-20234898
                </a>
            </div>
        </div>
    )
}

export default IndexPage;
