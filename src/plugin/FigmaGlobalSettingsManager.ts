import { MessageSender } from '@/plugin/MessageSender';
import { EventType } from '@/eventType';
import { PluginDataStorage } from '@/plugin/PluginDataStorage';

const IMGAZILLA_PLUGIN_GLOBAL_SETTINGS = 'IMGAZILLA_PLUGIN_GLOBAL_SETTINGS';

export const globalSettingsInitState = {
  settings: {
    themeColorHistory: {
      colorHistory: [],
      replaceIndex: 0,
    },
    bgColorHistory: {
      colorHistory: [],
      replaceIndex: 0,
    },
  }
}

export interface GlobalSettingsType {
  settings: {
    themeColorHistory: {
      colorHistory: string[];
      replaceIndex: number;
    };
    bgColorHistory: {
      colorHistory: string[];
      replaceIndex: number;
    };
  }
}

export class FigmaGlobalSettingsManager {
  private messageSender: MessageSender;
  private pluginDataStorage: PluginDataStorage;

  constructor() {
    this.messageSender = new MessageSender();
    this.pluginDataStorage = new PluginDataStorage();
  }

  async sendToUIGlobalSettings() {
    const settings = await this.pluginDataStorage.getGlobalData(IMGAZILLA_PLUGIN_GLOBAL_SETTINGS);

    const message = {
      type: EventType.UPDATE_PLUGIN_SETTINGS,
      payload: {
        data: settings ? JSON.parse(settings) : globalSettingsInitState
      }
    }
    this.messageSender.sendMessageToUI(message);
  }

  async updateGlobalSettings(updates: GlobalSettingsType) {
    await this.pluginDataStorage.setGlobalData(IMGAZILLA_PLUGIN_GLOBAL_SETTINGS, JSON.stringify(updates)).then(() => {
      const message = {
        type: EventType.UPDATE_PLUGIN_SETTINGS,
        payload: {
          data: updates
        }
      }
      this.messageSender.sendMessageToUI(message);
    })
  }
}