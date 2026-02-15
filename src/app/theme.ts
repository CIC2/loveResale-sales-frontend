import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { PrimeNGConfigType } from 'primeng/config';

const preset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          '50': '#E6EEF3',
          '100': '#D8F3DC',
          '200': '#B7E4C7',
          '300': '#95D5B2',
          '400': '#74C69D',
          '500': '#52B788',
          '600': '#40916C',
          '700': '#2D6A4F',
          '800': '#1B4332',
          '900': '#081C15',
        },
        surface: {
          '0': '#ffffff',
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
          '950': '#0d111c',
        },
        secondary: {
          '50': '#fef3e9',
          '100': '#fce4c8',
          '200': '#f9d5a3',
          '300': '#e5b87d',
          '400': '#d0a461',
          '500': '#af7e3c',
          '600': '#9f7235',
          '700': '#8f6830',
          '800': '#7f5e2b',
          '900': '#6f5426',
        },
        formField: {
          background: '{surface.0}',
          borderColor: '{surface.300}',
          borderColorHover: '{primary.500}',
          borderColorFocus: '{primary.500}',
          color: '{surface.900}',
          width: 'max-content',
          placeholderColor: '{surface.500}',
          paddingX: '0.8125rem',
          paddingY: '0.6875rem',
          borderRadius: '0.5rem',
          shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
  components: {
    radiobutton: {
      root: {
        borderColor: '{primary.500}',
        hoverBorderColor: '{primary.500}',
        checkedBackground: '{transparent}',
        checkedHoverBackground: '{transparent}',
      },
      icon: {
        checkedColor: '{primary.500}',
        checkedHoverColor: '{primary.500}',
        size: '0.5rem',
      },
    },
    breadcrumb: {
      root: {
        gap: '0.3rem',
        background: 'bg-transparent',
      },

      item: {
        color: 'text-white',
        hoverColor: '{primary-500}',
      },

      separator: {
        color: 'text-white',
      },
    },
    card: {
      title: {
        fontSize: '1.25rem',
        fontWeight: '600',
      },
    },
    dropdown: {
      width: '2.5rem',
      color: '{primary.500}',
    },
    tabs: {
      tab: {
        fontWeight: '500',
        padding: '0.5rem 2.5rem',
        color: '{surface.500}',
        hoverColor: '{surface.500}',
        activeColor: '{primary.500}',
        hoverBorderColor: 'transparent',
        activeBorderColor: '{primary.500}',
      },
      tablist: {
        borderColor: '{surface.500}',
      },
      activeBar: {
        background: '{primary.500}',
      },
      colorScheme: {
        light: {
          tab: {
            color: '{surface.500}',
          },
        },
      },
    },
    select: {
      dropdown: {
        width: '2.5rem',
        color: '{primary.500}',
      },
      optionGroup: {
        fontWeight: '{font-bold}',
      },
    },
    multiselect: {
      root: {
        borderColor: '#EEEEEE',
      },
      dropdown: {
        width: '2.5rem',
        color: '{primary.500}',
      },
      optionGroup: {
        color: '{primary.900}',
        fontWeight: '{list.option.group.font.weight}',
      },
    },
    button: {
      root: {
        borderRadius: '0.5rem',
        paddingY: '0.6875rem',
        paddingX: '1rem',
        gap: '0.5rem',
        transitionDuration: '200ms',
      },
      colorScheme: {
        light: {
          root: {
            /* Primary Button - Green (Main CTA) */
            primary: {
              background: '{primary.500}',
              color: '#ffffff',
              borderColor: '{primary.500}',
              hoverBackground: '{primary.600}',
              hoverColor: '#ffffff',
              hoverBorderColor: '{primary.600}',
              activeBackground: '{primary.700}',
              activeColor: '#ffffff',
              activeBorderColor: '{primary.700}',
            },

            /* Secondary Button - Orange/Gold */
            secondary: {
              background: '#af7e3c',
              color: '#ffffff',
              borderColor: '#af7e3c',
              hoverBackground: '#9f7235',
              hoverColor: '#ffffff',
              hoverBorderColor: '#9f7235',
              activeBackground: '#8f6830',
              activeColor: '#ffffff',
              activeBorderColor: '#8f6830',
            },

            /* Success Button - Green variant */
            success: {
              background: '#52B67C',
              color: '#ffffff',
              borderColor: '#52B67C',
              hoverBackground: '#40916C',
              hoverColor: '#ffffff',
              hoverBorderColor: '#40916C',
              activeBackground: '#2D6A4F',
              activeColor: '#ffffff',
              activeBorderColor: '#2D6A4F',
            },

            /* Info Button - Light background with primary text */
            info: {
              background: '{surface.100}',
              color: '{primary.500}',
              borderColor: '{surface.100}',
              hoverBackground: '{surface.200}',
              hoverColor: '{primary.600}',
              hoverBorderColor: '{surface.200}',
              activeBackground: '{surface.300}',
              activeColor: '{primary.700}',
              activeBorderColor: '{surface.300}',
            },

            /* Warn Button - Light background with secondary text */
            warn: {
              background: '{surface.100}',
              color: '#af7e3c',
              borderColor: '#af7e3c',
              hoverBackground: '#af7e3c',
              hoverColor: '#ffffff',
              hoverBorderColor: '#af7e3c',
              activeBackground: '#8f6830',
              activeColor: '#ffffff',
              activeBorderColor: '#8f6830',
            },

            /* Danger Button - Red for destructive actions */
            danger: {
              background: 'rgba(220, 38, 38, 0.05)',
              color: '#dc2626',
              borderColor: 'rgba(220, 38, 38, 0.05)',
              hoverBackground: '#dc2626',
              hoverColor: '#ffffff',
              hoverBorderColor: '#dc2626',
              activeBackground: '#b91c1c',
              activeColor: '#ffffff',
              activeBorderColor: '#b91c1c',
            },

            /* Contrast Button - Subtle gray */
            contrast: {
              background: '{surface.200}',
              color: '{surface.700}',
              borderColor: '{surface.300}',
              hoverBackground: '{surface.300}',
              hoverColor: '{surface.800}',
              hoverBorderColor: '{surface.400}',
              activeBackground: '{surface.400}',
              activeColor: '{surface.900}',
              activeBorderColor: '{surface.500}',
            },
          },

          /* Text Button Variants */
          text: {
            primary: {
              color: '{primary.600}',
              hoverBackground: 'rgba(82, 183, 136, 0.08)',
              activeBackground: 'rgba(82, 183, 136, 0.12)',
            },
            secondary: {
              color: '#af7e3c',
              hoverBackground: 'rgba(175, 126, 60, 0.08)',
              activeBackground: 'rgba(175, 126, 60, 0.12)',
            },
            danger: {
              color: '#dc2626',
              hoverBackground: 'rgba(220, 38, 38, 0.08)',
              activeBackground: 'rgba(220, 38, 38, 0.12)',
            },
          },

          /* Link Button Variant */
          link: {
            color: '#af7e3c',
          },

          /* Outlined Button Variants */
          outlined: {
            primary: {
              color: '{primary.500}',
              borderColor: '{primary.500}',
              hoverBackground: 'rgba(82, 183, 136, 0.08)',
              activeBackground: 'rgba(82, 183, 136, 0.12)',
            },
            secondary: {
              color: '#af7e3c',
              borderColor: '#af7e3c',
              hoverBackground: 'rgba(175, 126, 60, 0.08)',
              activeBackground: 'rgba(175, 126, 60, 0.12)',
            },
            info: {
              color: '#ffffff',
              borderColor: '#ffffff',
              hoverBackground: 'rgba(255, 255, 255, 0.15)',
              activeBackground: 'rgba(255, 255, 255, 0.25)',
            },
            success: {
              color: '{primary.600}',
              borderColor: '{primary.600}',
              hoverBackground: 'rgba(64, 145, 108, 0.08)',
              activeBackground: 'rgba(64, 145, 108, 0.12)',
            },
            danger: {
              color: '#dc2626',
              borderColor: '#dc2626',
              hoverBackground: 'rgba(220, 38, 38, 0.08)',
              activeBackground: 'rgba(220, 38, 38, 0.12)',
            },
          },
        },
      },
    },
  },
});

export const AppTheme: PrimeNGConfigType = {
  translation: {
    dateFormat: 'dd-mm-yy',
  },
  theme: {
    preset: preset,
    options: {
      cssLayer: {
        name: 'primeng',
        order: 'primeng',
      },
      darkModeSelector: false,
    },
  },
};
