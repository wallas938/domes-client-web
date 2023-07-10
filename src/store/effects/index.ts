import {ClientEffects} from "./clientEffects";
import {AuthenticationEffects} from "./authenticationEffects";
import {AnimalEffects} from "./animalEffects";
import {OrderEffects} from "./orderEffects";


export const AppEffects = [
  AnimalEffects,
  ClientEffects,
  AuthenticationEffects,
  OrderEffects
]
