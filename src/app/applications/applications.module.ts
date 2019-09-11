import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ApplicationRoutes } from './applications.routing'
import { PredictionComponent } from './prediction/prediction.component';
import { EnhancementComponent } from './enhancement/enhancement.component';
import { EstimatorComponent } from './estimator/estimator.component';
import { EqualizerComponent } from './equalizer/equalizer.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    RouterModule.forChild(ApplicationRoutes),
    ChartsModule
  ],
  declarations: [
    PredictionComponent,
    EnhancementComponent,
    EstimatorComponent,
    EqualizerComponent

  ]
})
export class ApplicationsModule {}
