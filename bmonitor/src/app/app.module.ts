import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import {HomeModule} from './home/home.module';
import {HttpLink} from 'apollo-angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Notification } from './service/notification/notification.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    FormsModule,
    SimpleNotificationsModule.forRoot({
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position:["top", "right"]
  }),
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const token = '';
        return {
          cache: new InMemoryCache(),
          link:  httpLink.create({
            //uri: 'https:/boopapi.com/graphql',
            //uri: 'http://koaela.com/graphql',
            //uri: 'https:/boopapi.com/qa/graphql',
              uri: 'http://gugubara.com/graphql'
          })
        };
      },
      deps: [HttpLink],
    },
    Notification
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
