import { Routes } from '@angular/router';

import { PredictionComponent } from './prediction/prediction.component';
import { EnhancementComponent } from './enhancement/enhancement.component';
import { EstimatorComponent } from './estimator/estimator.component';
import { EqualizerComponent } from './equalizer/equalizer.component';

export const ApplicationRoutes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'predict',
        component: PredictionComponent
      },
      {
        path: 'enhance',
        component: EnhancementComponent
      },
      {
        path: 'estimate',
        component: EstimatorComponent
      },
      {
        path: 'equalize',
        component: EqualizerComponent
      }
    ]
  }
]
