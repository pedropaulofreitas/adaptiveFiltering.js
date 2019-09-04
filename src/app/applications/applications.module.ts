import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ApplicationRoutes } from './applications.routing'
import { PredictionComponent } from './prediction/prediction.component';
import { EnhancementComponent } from './enhancement/enhancement.component';
import { EstimatorComponent } from './estimator/estimator.component';
import { EqualizerComponent } from './equalizer/equalizer.component';

@NgModule({
  imports: [
    RouterModule.forChild(ApplicationRoutes)
  ],
  declarations: [
    PredictionComponent,
    EnhancementComponent,
    EstimatorComponent,
    EqualizerComponent
  ]
})
export class ApplicationsModule {}
