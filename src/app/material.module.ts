import { NgModule           } from "@angular/core";
import { MatButtonModule    } from "@angular/material/button";
import { MatListModule      } from "@angular/material/list";
import { MatCardModule      } from "@angular/material/card";
import { MatToolbarModule   } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule     } from "@angular/material/input";
import { MatSidenavModule   } from "@angular/material/sidenav";
import { MatIconModule      } from "@angular/material/icon";
import { MatMenuModule      } from "@angular/material/menu";
import { MatTableModule     } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

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
    MatTableModule,
    MatPaginatorModule
];

@NgModule({
    imports:[...modules],
    exports:[...modules]
})


export class MaterialModule{}
