import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listFilter'
  })
  export class ListFilterPipe implements PipeTransform {

    transform(list: any[], filterText: string): any {
        // console.log(list);
        if (!filterText) {
            return list;
        } else {
            // console.log(filterText);

            return list ? list
            .filter(item => item.name
                .search(new RegExp(filterText, 'i')) > -1) : [];
        }

    }

  }
