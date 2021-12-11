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
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule     } from "@angular/material/table";
import { MatDialogModule    } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";



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
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule
];

@NgModule({
    imports:[...modules],
    exports:[...modules]
})


export class MaterialModule{}
