import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputLookupModule } from './input-lookup/input-lookup.module';
import { InputDateModule } from './input-date/input-date.module';
import { MessageModule } from './message/message.module';
import { InputEmailModule } from './input-email/input-email.module';
import { InputWebModule } from './input-web/input-web.module';
import { InputNumericModule } from './input-numeric/input-numeric.module';
import {InputLookup2Module} from './input-lookup2/input-lookup.module'
import { InputLookup3Module } from './input-lookup3/input-lookup.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    InputDateModule,
    InputEmailModule,
    InputLookupModule,
    InputNumericModule,
    InputWebModule,
    MessageModule,
    InputLookup2Module,
    InputLookup3Module,

  ]
})
export class FormModule { }
