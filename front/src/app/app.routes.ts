import { Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { AgentPageComponent } from './pages/agent-page/agent-page.component';
import { ChoixAgentComponent } from './componenet/choix-agent/choix-agent.component';
import { EcranComponent } from './pages/ecran/ecran.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
    {
        path: '',
        component: EcranComponent
    },
    {
        path:'acceuil',
        component: AcceuilComponent
    },
    {
        path:'agent',
        component: ChoixAgentComponent
    },
    {
        path: 'agent/:id',
        component: AgentPageComponent
    },
    {
        path: 'admin',
        component: AdminPageComponent
    }
];
