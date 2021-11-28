import {createTheme, ThemeOptions} from "@mui/material";
import {grey} from '@mui/material/colors'
import '@mui/lab/themeAugmentation';

const lineColor = grey["200"]

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: 'rgba(158,188,51,1)',
            contrastText: 'rgba(255,255,255,1)'
        },
        secondary: {
            main: 'rgba(35,82,194,1)',
            contrastText: 'rgba(255,255,255,1)'
        },
        success: {
            main: 'rgba(102,187,106,1)'
        },
        error: {
            main: 'rgba(244,67,54,1)'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        }
    },
    typography: {
        fontSize: 16,
        h1: {
            fontSize: '2rem',
            fontWeight: 800,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 800,
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: 800,
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 800,
        },
        subtitle1: {
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 800,
        },
        body1: {
            fontSize: '0.875rem',
        },
        button: {
            textTransform: 'uppercase',
            fontSize: '0.875rem',
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottomWidth: 1,
                    borderBottomStyle: 'solid',
                    borderBottomColor: lineColor
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderColor: 'transparent',
                    overflow: 'hidden'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: lineColor
                }
            }
        },
        MuiTreeItem: {
            styleOverrides: {
                content: {
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    paddingRight: 8,
                    fontWeight: 400,

                    '&.Mui-selected': {
                        fontWeight: 800,
                        color: 'rgba(158,188,51,1)',
                        backgroundColor: 'rgba(158,188,51,0.2)',

                        '&:hover': {
                            fontWeight: 800,
                            color: 'rgba(158,188,51,1)',
                            backgroundColor: 'rgba(158,188,51,0.2)',

                        },

                        '&.Mui-focused': {
                            fontWeight: 800,
                            color: 'rgba(158,188,51,1)',
                            backgroundColor: 'rgba(158,188,51,0.2)',
                        },
                    },

                    '&.Mui-focused': {
                        fontWeight: 800,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                    },
                },
                label: {
                    fontWeight: 'inherit',

                    '& .MuiTypography-body1': {
                        fontSize: '0.9rem',
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    fontWeight: 600
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    overflowX: 'auto',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
                }
            }
        }
    }
}

export const theme = createTheme(themeOptions)