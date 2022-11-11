import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
//let where = '';
const getAllUsers = (where:String,order:string) => gql`
query dataQuery($skip:Int!,$take:Int!){ 
dataQuery(table:"user.b_user.user",skip:$skip,take:$take
include:{ 
profile : {include: {preference:true }}
}
${where}
${order}
) {
data
}
}
`;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) { }
  async loadUser(cb: (x: any) => any, queryParams : any) {
    const where = queryParams.whereCond;
    console.log("whaasdere",where);
    const orderBy= queryParams.orderBy? queryParams.profile != null ? `orderBy : { ${queryParams.profile} : { ${queryParams.orderBy} : "${queryParams.orderMethod}" } }` :`orderBy:{ ${queryParams.orderBy} : "${queryParams.orderMethod}"}`:'';
    const query = this.apollo.query<any>({
      query: getAllUsers(where,orderBy),
      variables: {
        skip: queryParams.skip,
        take: queryParams.take,
      }
    }).pipe(map((data) => data));

    query.subscribe((res) => {
      const { data } = res;
      const { dataQuery } = data;
      cb(dataQuery);
    })
  }
}
