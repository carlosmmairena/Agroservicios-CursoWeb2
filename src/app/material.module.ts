import { NgModule           } from "@angular/core";
import { MatButtonModule    } from "@angular/material/button";
import { MatListModule      } from "@angular/material/list";
import { MatCardModule      } from "@angular/material/card";
import { MatToolbarModule   } from "@angular/material/toolbar";
import { MatInputModule     } from "@angular/material/input";
import { MatSidenavModule   } from "@angular/material/sidenav";
import { MatIconModule      } from "@angular/material/icon";
import { MatMenuModule      } from "@angular/material/menu";
import { MatDialogModule   } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule} from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';






const modules=[
    MatButtonModule, 
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule
];

@NgModule({
    imports:[...modules],
    exports:[...modules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MaterialModule{}
