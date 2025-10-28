// https://www.sanity.io/docs/structure-builder-cheat-sheet
import { PiHouseLineFill } from 'react-icons/pi';
import { GiShoppingBag } from 'react-icons/gi';

export const structure = (S) =>
  S.list()
    .title('Innehåll')
    .items([
      S.listItem()
        .title('Hem')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('25f7f7f1-57b9-426d-a06d-ceac03fb37fb')
        )
        .icon(PiHouseLineFill),
      S.listItem()
        .title('Butik')
        .schemaType('shop')
        .icon(GiShoppingBag)
        .child(S.documentTypeList('shop').title('Föremål till salu')),
    ]);
