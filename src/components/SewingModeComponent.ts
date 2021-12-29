import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { SewingModeOutput } from '../output/SewingModeOutput';

import { sendRequest } from '../services/WebRequestService';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class SewingModeComponent extends BaseComponent {
  START() {
    return this.$send(SewingModeOutput, { message: 'Please enter sewing mode.' });
  }

  @Intents(['SetModeIntent'])
  async setSewMode() {
    var mode:string | undefined = this.$entities.mode?.id;
    var modeCode:string = mode ? mode.toLowerCase().replace(' ', '-') : '';
    var success = await sendRequest(modeCode);
    if(success){
      return this.$send({ message: 'Setting mode: ' + mode});
    }
    else{
      return this.$send({ message: 'Connection error.'});
    }
  }

  UNHANDLED() {
    return this.START();
  }
}
